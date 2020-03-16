const App = function() {
    // <div id="app"></div>
};

document.addEventListener('DOMContentLoaded', App);

const audioCache = [];

function loadAudio(filename) {
    if(audioCache[filename]) {
        return audioCache[filename];
    } else {
        const audioFile = new Audio(`/assets/${filename}.wav`);
        audioFile.load();
        audioCache[filename] = audioFile;
        return audioFile;
    }
}

function randomBetween(start, end) {
    return start + (Math.random() * (end - start));
}