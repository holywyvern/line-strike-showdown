export const Utils = {
  encodeURI(str) {
    return encodeURIComponent(str).replace(/%2F/g, "/");
  },
  canPlayOgg() {
    if (!Utils._audioElement) {
      Utils._audioElement = document.createElement("audio");
    }
    return !!(
      Utils._audioElement &&
      Utils._audioElement.canPlayType('audio/ogg; codecs="vorbis"')
    );
  },
};
