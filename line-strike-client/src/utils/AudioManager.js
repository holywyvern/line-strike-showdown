import { Utils } from "./Utils";
import { WebAudio } from "./WebAudio";

export const AudioManager = {
  _bgmVolume: 100,
  _bgsVolume: 100,
  _meVolume: 100,
  _seVolume: 100,
  _currentBgm: null,
  _currentBgs: null,
  _bgmBuffer: null,
  _bgsBuffer: null,
  _meBuffer: null,
  _seBuffers: [],
  _staticBuffers: [],
  _replayFadeTime: 0.5,
  _path: "",

  get generalVolume() {
    return this._bgmVolume;
  },
  set generalVolume(value) {
    this.bgmVolume = value;
    this.bgsVolume = value;
    this.meVolume = value;
    this.seVolume = value;
  },

  get bgmVolume() {
    return this._bgmVolume;
  },
  set bgmVolume(value) {
    this._bgmVolume = value;
    this.updateBgmParameters(this._currentBgm);
  },

  get bgsVolume() {
    return this._bgsVolume;
  },
  set bgsVolume(value) {
    this._bgsVolume = value;
    this.updateBgsParameters(this._currentBgs);
  },

  get meVolume() {
    return this._meVolume;
  },
  set meVolume(value) {
    this._meVolume = value;
    this.updateMeParameters(this._currentMe);
  },

  get seVolume() {
    return this._seVolume;
  },
  set seVolume(value) {
    this._seVolume = value;
  },

  playBgm(bgm, pos) {
    if (this.isCurrentBgm(bgm)) {
      this.updateBgmParameters(bgm);
    } else {
      this.stopBgm();
      if (bgm.name) {
        this._bgmBuffer = this.createBuffer("music/", bgm.name);
        this.updateBgmParameters(bgm);
        if (!this._meBuffer) {
          this._bgmBuffer.play(true, pos || 0);
        }
      }
    }
    this.updateCurrentBgm(bgm, pos);
  },

  replayBgm(bgm) {
    if (this.isCurrentBgm(bgm)) {
      this.updateBgmParameters(bgm);
    } else {
      this.playBgm(bgm, bgm.pos);
      if (this._bgmBuffer) {
        this._bgmBuffer.fadeIn(this._replayFadeTime);
      }
    }
  },

  isCurrentBgm(bgm) {
    return (
      this._currentBgm && this._bgmBuffer && this._currentBgm.name === bgm.name
    );
  },

  updateBgmParameters(bgm) {
    this.updateBufferParameters(this._bgmBuffer, this._bgmVolume, bgm);
  },

  updateCurrentBgm(bgm, pos) {
    this._currentBgm = {
      name: bgm.name,
      volume: bgm.volume,
      pitch: bgm.pitch,
      pan: bgm.pan,
      pos: pos,
    };
  },

  stopBgm() {
    if (this._bgmBuffer) {
      this._bgmBuffer.destroy();
      this._bgmBuffer = null;
      this._currentBgm = null;
    }
  },

  fadeOutBgm(duration) {
    if (this._bgmBuffer && this._currentBgm) {
      this._bgmBuffer.fadeOut(duration);
      this._currentBgm = null;
    }
  },

  fadeInBgm(duration) {
    if (this._bgmBuffer && this._currentBgm) {
      this._bgmBuffer.fadeIn(duration);
    }
  },

  playBgs(bgs, pos) {
    if (this.isCurrentBgs(bgs)) {
      this.updateBgsParameters(bgs);
    } else {
      this.stopBgs();
      if (bgs.name) {
        this._bgsBuffer = this.createBuffer("bgs/", bgs.name);
        this.updateBgsParameters(bgs);
        this._bgsBuffer.play(true, pos || 0);
      }
    }
    this.updateCurrentBgs(bgs, pos);
  },

  replayBgs(bgs) {
    if (this.isCurrentBgs(bgs)) {
      this.updateBgsParameters(bgs);
    } else {
      this.playBgs(bgs, bgs.pos);
      if (this._bgsBuffer) {
        this._bgsBuffer.fadeIn(this._replayFadeTime);
      }
    }
  },

  isCurrentBgs(bgs) {
    return (
      this._currentBgs && this._bgsBuffer && this._currentBgs.name === bgs.name
    );
  },

  updateBgsParameters(bgs) {
    this.updateBufferParameters(this._bgsBuffer, this._bgsVolume, bgs);
  },

  updateCurrentBgs(bgs, pos) {
    this._currentBgs = {
      name: bgs.name,
      volume: bgs.volume,
      pitch: bgs.pitch,
      pan: bgs.pan,
      pos: pos,
    };
  },

  stopBgs() {
    if (this._bgsBuffer) {
      this._bgsBuffer.destroy();
      this._bgsBuffer = null;
      this._currentBgs = null;
    }
  },

  fadeOutBgs(duration) {
    if (this._bgsBuffer && this._currentBgs) {
      this._bgsBuffer.fadeOut(duration);
      this._currentBgs = null;
    }
  },

  fadeInBgs(duration) {
    if (this._bgsBuffer && this._currentBgs) {
      this._bgsBuffer.fadeIn(duration);
    }
  },

  playMe(me) {
    this.stopMe();
    if (me.name) {
      if (this._bgmBuffer && this._currentBgm) {
        this._currentBgm.pos = this._bgmBuffer.seek();
        this._bgmBuffer.stop();
      }
      this._meBuffer = this.createBuffer("me/", me.name);
      this.updateMeParameters(me);
      this._meBuffer.play(false);
      this._meBuffer.addStopListener(this.stopMe.bind(this));
    }
  },

  updateMeParameters(me) {
    this.updateBufferParameters(this._meBuffer, this._meVolume, me);
  },

  fadeOutMe(duration) {
    if (this._meBuffer) {
      this._meBuffer.fadeOut(duration);
    }
  },

  stopMe() {
    if (this._meBuffer) {
      this._meBuffer.destroy();
      this._meBuffer = null;
      if (this._bgmBuffer && this._currentBgm && !this._bgmBuffer.isPlaying()) {
        this._bgmBuffer.play(true, this._currentBgm.pos);
        this._bgmBuffer.fadeIn(this._replayFadeTime);
      }
    }
  },

  playSe(se) {
    if (se.name) {
      // [Note] Do not play the same sound in the same frame.
      const latestBuffers = this._seBuffers.filter(
        (buffer) => buffer.frameCount === 0
      );
      if (latestBuffers.find((buffer) => buffer.name === se.name)) {
        return;
      }
      const buffer = this.createBuffer("sfx/", se.name);
      this.updateSeParameters(buffer, se);
      buffer.play(false);
      this._seBuffers.push(buffer);
      this.cleanupSe();
    }
  },

  updateSeParameters(buffer, se) {
    this.updateBufferParameters(buffer, this._seVolume, se);
  },

  cleanupSe() {
    for (const buffer of this._seBuffers) {
      if (!buffer.isPlaying()) {
        buffer.destroy();
      }
    }
    this._seBuffers = this._seBuffers.filter((buffer) => buffer.isPlaying());
  },

  stopSe() {
    for (const buffer of this._seBuffers) {
      buffer.destroy();
    }
    this._seBuffers = [];
  },

  playStaticSe(se) {
    if (se.name) {
      this.loadStaticSe(se);
      for (const buffer of this._staticBuffers) {
        if (buffer.name === se.name) {
          buffer.stop();
          this.updateSeParameters(buffer, se);
          buffer.play(false);
          break;
        }
      }
    }
  },

  loadStaticSe(se) {
    if (se.name && !this.isStaticSe(se)) {
      const buffer = this.createBuffer("sfx/", se.name);
      this._staticBuffers.push(buffer);
    }
  },

  isStaticSe(se) {
    for (const buffer of this._staticBuffers) {
      if (buffer.name === se.name) {
        return true;
      }
    }
    return false;
  },

  stopAll() {
    this.stopMe();
    this.stopBgm();
    this.stopBgs();
    this.stopSe();
  },

  saveBgm() {
    if (this._currentBgm) {
      const bgm = this._currentBgm;
      return {
        name: bgm.name,
        volume: bgm.volume,
        pitch: bgm.pitch,
        pan: bgm.pan,
        pos: this._bgmBuffer ? this._bgmBuffer.seek() : 0,
      };
    } else {
      return this.makeEmptyAudioObject();
    }
  },

  saveBgs() {
    if (this._currentBgs) {
      const bgs = this._currentBgs;
      return {
        name: bgs.name,
        volume: bgs.volume,
        pitch: bgs.pitch,
        pan: bgs.pan,
        pos: this._bgsBuffer ? this._bgsBuffer.seek() : 0,
      };
    } else {
      return this.makeEmptyAudioObject();
    }
  },
  makeEmptyAudioObject() {
    return { name: "", volume: 0, pitch: 0 };
  },

  createBuffer(folder, name) {
    const ext = this.audioFileExt();
    const url = this._path + folder + Utils.encodeURI(name) + ext;
    const buffer = new WebAudio(url);
    buffer.name = name;
    buffer.frameCount = 0;
    return buffer;
  },

  updateBufferParameters(buffer, configVolume, audio) {
    if (buffer && audio) {
      buffer.volume = (configVolume * (audio.volume || 0)) / 10000;
      buffer.pitch = (audio.pitch || 0) / 100;
      buffer.pan = (audio.pan || 0) / 100;
    }
  },

  audioFileExt() {
    return ".ogg";
  },

  checkErrors() {
    const buffers = [this._bgmBuffer, this._bgsBuffer, this._meBuffer];
    buffers.push(...this._seBuffers);
    buffers.push(...this._staticBuffers);
    for (const buffer of buffers) {
      if (buffer && buffer.isError()) {
        this.throwLoadError(buffer);
      }
    }
  },

  throwLoadError(webAudio) {
    const retry = webAudio.retry.bind(webAudio);
    throw ["LoadError", webAudio.url, retry];
  },
};
