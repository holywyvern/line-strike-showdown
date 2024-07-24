import { Utils } from "./Utils";

export class WebAudio {
  static initialize() {
    this._context = null;
    this._masterGainNode = null;
    this._masterVolume = 1;
    this._createContext();
    this._createMasterGainNode();
    this._setupEventHandlers();
    return !!this._context;
  }

  static get masterVolume() {
    return this._masterVolume;
  }

  static set masterVolume(value) {
    this._masterVolume = value;
    this._resetVolume();
  }

  static _createContext() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this._context = new AudioContext();
    } catch (e) {
      this._context = null;
    }
  }

  static _currentTime() {
    return this._context ? this._context.currentTime : 0;
  }

  static _createMasterGainNode() {
    const context = this._context;
    if (context) {
      this._masterGainNode = context.createGain();
      this._resetVolume();
      this._masterGainNode.connect(context.destination);
    }
  }

  static _setupEventHandlers() {
    const onUserGesture = this._onUserGesture.bind(this);
    const onVisibilityChange = this._onVisibilityChange.bind(this);
    document.addEventListener("keydown", onUserGesture);
    document.addEventListener("mousedown", onUserGesture);
    document.addEventListener("touchend", onUserGesture);
    document.addEventListener("visibilitychange", onVisibilityChange);
  }

  static _onUserGesture() {
    const context = this._context;
    if (context && context.state === "suspended") {
      context.resume();
    }
  }

  static _onVisibilityChange() {
    if (document.visibilityState === "hidden") {
      this._onHide();
    } else {
      this._onShow();
    }
  }

  static _onHide() {
    this._fadeOut(1);
  }

  static _onShow() {
    this._fadeIn(1);
  }

  static _resetVolume() {
    if (this._masterGainNode) {
      const gain = this._masterGainNode.gain;
      const volume = this._masterVolume;
      const currentTime = this._currentTime();
      gain.setValueAtTime(volume, currentTime);
    }
  }

  static _fadeIn(duration) {
    if (this._masterGainNode) {
      const gain = this._masterGainNode.gain;
      const volume = this._masterVolume;
      const currentTime = this._currentTime();
      gain.setValueAtTime(0, currentTime);
      gain.linearRampToValueAtTime(volume, currentTime + duration);
    }
  }

  static _fadeOut(duration) {
    if (this._masterGainNode) {
      const gain = this._masterGainNode.gain;
      const volume = this._masterVolume;
      const currentTime = this._currentTime();
      gain.setValueAtTime(volume, currentTime);
      gain.linearRampToValueAtTime(0, currentTime + duration);
    }
  }

  constructor(url) {
    this.clear();
    this._url = url;
    this._startLoading();
  }

  clear() {
    this.stop();
    this._data = null;
    this._fetchedSize = 0;
    this._fetchedData = [];
    this._buffers = [];
    this._sourceNodes = [];
    this._gainNode = null;
    this._pannerNode = null;
    this._totalTime = 0;
    this._sampleRate = 0;
    this._loop = 0;
    this._loopStart = 0;
    this._loopLength = 0;
    this._loopStartTime = 0;
    this._loopLengthTime = 0;
    this._startTime = 0;
    this._volume = 1;
    this._pitch = 1;
    this._pan = 0;
    this._endTimer = null;
    this._loadListeners = [];
    this._stopListeners = [];
    this._lastUpdateTime = 0;
    this._isLoaded = false;
    this._isError = false;
    this._isPlaying = false;
    this._decoder = null;
  }

  get url() {
    return this._url;
  }

  get volume() {
    return this._volume;
  }

  set volume(value) {
    this._volume = value;
    if (this._gainNode) {
      this._gainNode.gain.setValueAtTime(this._volume, WebAudio._currentTime());
    }
  }

  isReady() {
    return this._buffers && this._buffers.length > 0;
  }

  isError() {
    return this._isError;
  }

  isPlaying() {
    return this._isPlaying;
  }

  play(loop, offset) {
    this._loop = loop;
    if (this.isReady()) {
      offset = offset || 0;
      this._startPlaying(offset);
    } else if (WebAudio._context) {
      this.addLoadListener(() => this.play(loop, offset));
    }
    this._isPlaying = true;
  }

  stop() {
    this._isPlaying = false;
    this._removeEndTimer();
    this._removeNodes();
    this._loadListeners = [];
    if (this._stopListeners) {
      while (this._stopListeners.length > 0) {
        const listner = this._stopListeners.shift();
        listner();
      }
    }
  }

  destroy() {
    this._destroyDecoder();
    this.clear();
  }

  fadeIn(duration) {
    if (this.isReady()) {
      if (this._gainNode) {
        const gain = this._gainNode.gain;
        const currentTime = WebAudio._currentTime();
        gain.setValueAtTime(0, currentTime);
        gain.linearRampToValueAtTime(this._volume, currentTime + duration);
      }
    } else {
      this.addLoadListener(() => this.fadeIn(duration));
    }
  }

  fadeOut(duration) {
    if (this._gainNode) {
      const gain = this._gainNode.gain;
      const currentTime = WebAudio._currentTime();
      gain.setValueAtTime(this._volume, currentTime);
      gain.linearRampToValueAtTime(0, currentTime + duration);
    }
    this._isPlaying = false;
    this._loadListeners = [];
  }

  seek() {
    if (WebAudio._context) {
      let pos = (WebAudio._currentTime() - this._startTime) * this._pitch;
      if (this._loopLengthTime > 0) {
        while (pos >= this._loopStartTime + this._loopLengthTime) {
          pos -= this._loopLengthTime;
        }
      }
      return pos;
    } else {
      return 0;
    }
  }

  addLoadListener(listner) {
    this._loadListeners.push(listner);
  }

  addStopListener(listner) {
    this._stopListeners.push(listner);
  }

  retry() {
    this._startLoading();
    if (this._isPlaying) {
      this.play(this._loop, 0);
    }
  }

  _startLoading() {
    if (WebAudio._context) {
      const url = this._realUrl();
      this._startFetching(url);
      const currentTime = WebAudio._currentTime();
      this._lastUpdateTime = currentTime - 0.5;
      this._isError = false;
      this._isLoaded = false;
      this._destroyDecoder();
      if (this._shouldUseDecoder()) {
        this._createDecoder();
      }
    }
  }

  _shouldUseDecoder() {
    return !Utils.canPlayOgg() && typeof VorbisDecoder === "function";
  }

  _createDecoder() {
    // eslint-disable-next-line no-undef
    this._decoder = new VorbisDecoder(
      WebAudio._context,
      this._onDecode.bind(this),
      this._onError.bind(this)
    );
  }

  _destroyDecoder() {
    if (this._decoder) {
      this._decoder.destroy();
      this._decoder = null;
    }
  }

  _realUrl() {
    return this._url;
  }

  _startFetching(url) {
    const options = { credentials: "same-origin" };
    fetch(url, options)
      .then((response) => this._onFetch(response))
      .catch(() => this._onError());
  }

  _onFetch(response) {
    if (response.ok) {
      const reader = response.body.getReader();
      const readChunk = ({ done, value }) => {
        if (done) {
          this._isLoaded = true;
          if (this._fetchedSize > 0) {
            this._concatenateFetchedData();
            this._updateBuffer();
            this._data = null;
          }
          return 0;
        } else {
          this._onFetchProcess(value);
          return reader.read().then(readChunk);
        }
      };
      reader
        .read()
        .then(readChunk)
        .catch(() => this._onError());
    } else {
      this._onError();
    }
  }

  _onError() {
    if (this._sourceNodes.length > 0) {
      this._stopSourceNode();
    }
    this._data = null;
    this._isError = true;
  }

  _onFetchProcess(value) {
    this._fetchedSize += value.length;
    this._fetchedData.push(value);
    this._updateBufferOnFetch();
  }

  _updateBufferOnFetch() {
    const currentTime = WebAudio._currentTime();
    const deltaTime = currentTime - this._lastUpdateTime;
    const currentData = this._data;
    const currentSize = currentData ? currentData.length : 0;
    if (deltaTime >= 1 && currentSize + this._fetchedSize >= 200000) {
      this._concatenateFetchedData();
      this._updateBuffer();
      this._lastUpdateTime = currentTime;
    }
  }

  _concatenateFetchedData() {
    const currentData = this._data;
    const currentSize = currentData ? currentData.length : 0;
    const newData = new Uint8Array(currentSize + this._fetchedSize);
    let pos = 0;
    if (currentData) {
      newData.set(currentData);
      pos += currentSize;
    }
    for (const value of this._fetchedData) {
      newData.set(value, pos);
      pos += value.length;
    }
    this._data = newData;
    this._fetchedData = [];
    this._fetchedSize = 0;
  }

  _updateBuffer() {
    const arrayBuffer = this._readableBuffer();
    this._readLoopComments(arrayBuffer);
    this._decodeAudioData(arrayBuffer);
  }

  _readableBuffer() {
    return this._data.buffer;
  }

  _decodeAudioData(arrayBuffer) {
    if (this._shouldUseDecoder()) {
      if (this._decoder) {
        this._decoder.send(arrayBuffer, this._isLoaded);
      }
    } else {
      // [Note] Make a temporary copy of arrayBuffer because
      //   decodeAudioData() detaches it.
      WebAudio._context
        .decodeAudioData(arrayBuffer.slice())
        .then((buffer) => this._onDecode(buffer))
        .catch(() => this._onError());
    }
  }

  _onDecode(buffer) {
    if (!this._shouldUseDecoder()) {
      this._buffers = [];
      this._totalTime = 0;
    }
    this._buffers.push(buffer);
    this._totalTime += buffer.duration;
    if (this._loopLength > 0 && this._sampleRate > 0) {
      this._loopStartTime = this._loopStart / this._sampleRate;
      this._loopLengthTime = this._loopLength / this._sampleRate;
    } else {
      this._loopStartTime = 0;
      this._loopLengthTime = this._totalTime;
    }
    if (this._sourceNodes.length > 0) {
      this._refreshSourceNode();
    }
    this._onLoad();
  }

  _refreshSourceNode() {
    if (this._shouldUseDecoder()) {
      const index = this._buffers.length - 1;
      this._createSourceNode(index);
      if (this._isPlaying) {
        this._startSourceNode(index);
      }
    } else {
      this._stopSourceNode();
      this._createAllSourceNodes();
      if (this._isPlaying) {
        this._startAllSourceNodes();
      }
    }
    if (this._isPlaying) {
      this._removeEndTimer();
      this._createEndTimer();
    }
  }

  _startPlaying(offset) {
    if (this._loopLengthTime > 0) {
      while (offset >= this._loopStartTime + this._loopLengthTime) {
        offset -= this._loopLengthTime;
      }
    }
    this._startTime = WebAudio._currentTime() - offset / this._pitch;
    this._removeEndTimer();
    this._removeNodes();
    this._createPannerNode();
    this._createGainNode();
    this._createAllSourceNodes();
    this._startAllSourceNodes();
    this._createEndTimer();
  }

  _startAllSourceNodes() {
    for (let i = 0; i < this._sourceNodes.length; i++) {
      this._startSourceNode(i);
    }
  }

  _startSourceNode(index) {
    const sourceNode = this._sourceNodes[index];
    const seekPos = this.seek();
    const currentTime = WebAudio._currentTime();
    const loop = this._loop;
    const loopStart = this._loopStartTime;
    const loopLength = this._loopLengthTime;
    const loopEnd = loopStart + loopLength;
    const pitch = this._pitch;
    let chunkStart = 0;
    for (let i = 0; i < index; i++) {
      chunkStart += this._buffers[i].duration;
    }
    const chunkEnd = chunkStart + sourceNode.buffer.duration;
    let when = 0;
    let offset = 0;
    let duration = sourceNode.buffer.duration;
    if (seekPos >= chunkStart && seekPos < chunkEnd - 0.01) {
      when = currentTime;
      offset = seekPos - chunkStart;
    } else {
      when = currentTime + (chunkStart - seekPos) / pitch;
      offset = 0;
      if (loop) {
        if (when < currentTime - 0.01) {
          when += loopLength / pitch;
        }
        if (seekPos >= loopStart && chunkStart < loopStart) {
          when += (loopStart - chunkStart) / pitch;
          offset = loopStart - chunkStart;
        }
      }
    }
    if (loop && loopEnd < chunkEnd) {
      duration = loopEnd - chunkStart - offset;
    }
    if (this._shouldUseDecoder()) {
      if (when >= currentTime && offset < duration) {
        sourceNode.loop = false;
        sourceNode.start(when, offset, duration);
        if (loop && chunkEnd > loopStart) {
          sourceNode.onended = () => {
            this._createSourceNode(index);
            this._startSourceNode(index);
          };
        }
      }
    } else {
      if (when >= currentTime && offset < sourceNode.buffer.duration) {
        sourceNode.start(when, offset);
      }
    }
    chunkStart += sourceNode.buffer.duration;
  }

  _stopSourceNode() {
    for (const sourceNode of this._sourceNodes) {
      try {
        sourceNode.onended = null;
        sourceNode.stop();
      } catch (e) {
        // Ignore InvalidStateError
      }
    }
  }

  _createPannerNode() {
    this._pannerNode = WebAudio._context.createPanner();
    this._pannerNode.panningModel = "equalpower";
    this._pannerNode.connect(WebAudio._masterGainNode);
    this._updatePanner();
  }

  _createGainNode() {
    const currentTime = WebAudio._currentTime();
    this._gainNode = WebAudio._context.createGain();
    this._gainNode.gain.setValueAtTime(this._volume, currentTime);
    this._gainNode.connect(this._pannerNode);
  }

  _createAllSourceNodes() {
    for (let i = 0; i < this._buffers.length; i++) {
      this._createSourceNode(i);
    }
  }

  _createSourceNode(index) {
    const sourceNode = WebAudio._context.createBufferSource();
    const currentTime = WebAudio._currentTime();
    sourceNode.buffer = this._buffers[index];
    sourceNode.loop = this._loop && this._isLoaded;
    sourceNode.loopStart = this._loopStartTime;
    sourceNode.loopEnd = this._loopStartTime + this._loopLengthTime;
    sourceNode.playbackRate.setValueAtTime(this._pitch, currentTime);
    sourceNode.connect(this._gainNode);
    this._sourceNodes[index] = sourceNode;
  }

  _removeNodes() {
    if (this._sourceNodes && this._sourceNodes.length > 0) {
      this._stopSourceNode();
      this._sourceNodes = [];
      this._gainNode = null;
      this._pannerNode = null;
    }
  }

  _createEndTimer() {
    if (this._sourceNodes.length > 0 && !this._loop) {
      const endTime = this._startTime + this._totalTime / this._pitch;
      const delay = endTime - WebAudio._currentTime();
      this._endTimer = setTimeout(this.stop.bind(this), delay * 1000);
    }
  }

  _removeEndTimer() {
    if (this._endTimer) {
      clearTimeout(this._endTimer);
      this._endTimer = null;
    }
  }

  _updatePanner() {
    if (this._pannerNode) {
      const x = this._pan;
      const z = 1 - Math.abs(x);
      this._pannerNode.setPosition(x, 0, z);
    }
  }

  _onLoad() {
    while (this._loadListeners.length > 0) {
      const listner = this._loadListeners.shift();
      listner();
    }
  }

  _readLoopComments(arrayBuffer) {
    const view = new DataView(arrayBuffer);
    let index = 0;
    while (index < view.byteLength - 30) {
      if (this._readFourCharacters(view, index) !== "OggS") {
        break;
      }
      index += 26;
      const numSegments = view.getUint8(index++);
      const segments = [];
      for (let i = 0; i < numSegments; i++) {
        segments.push(view.getUint8(index++));
      }
      const packets = [];
      while (segments.length > 0) {
        let packetSize = 0;
        while (segments[0] === 255) {
          packetSize += segments.shift();
        }
        if (segments.length > 0) {
          packetSize += segments.shift();
        }
        packets.push(packetSize);
      }
      let vorbisHeaderFound = false;
      for (const size of packets) {
        if (this._readFourCharacters(view, index + 1) === "vorb") {
          const headerType = view.getUint8(index);
          if (headerType === 1) {
            this._sampleRate = view.getUint32(index + 12, true);
          } else if (headerType === 3) {
            this._readMetaData(view, index, size);
          }
          vorbisHeaderFound = true;
        }
        index += size;
      }
      if (!vorbisHeaderFound) {
        break;
      }
    }
  }

  _readMetaData(view, index, size) {
    for (let i = index; i < index + size - 10; i++) {
      if (this._readFourCharacters(view, i) === "LOOP") {
        let text = "";
        while (view.getUint8(i) > 0) {
          text += String.fromCharCode(view.getUint8(i++));
        }
        if (text.match(/LOOPSTART=([0-9]+)/)) {
          this._loopStart = parseInt(RegExp.$1);
        }
        if (text.match(/LOOPLENGTH=([0-9]+)/)) {
          this._loopLength = parseInt(RegExp.$1);
        }
        if (text === "LOOPSTART" || text === "LOOPLENGTH") {
          let text2 = "";
          i += 16;
          while (view.getUint8(i) > 0) {
            text2 += String.fromCharCode(view.getUint8(i++));
          }
          if (text === "LOOPSTART") {
            this._loopStart = parseInt(text2);
          } else {
            this._loopLength = parseInt(text2);
          }
        }
      }
    }
  }

  _readFourCharacters(view, index) {
    let string = "";
    if (index <= view.byteLength - 4) {
      for (let i = 0; i < 4; i++) {
        string += String.fromCharCode(view.getUint8(index + i));
      }
    }
    return string;
  }
}
