var song = new sound("sound/longsong.mp3");
var duration;
var currentTime;

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.updateDuration = function() {
        duration = this.sound.duration;
    }
    this.updateTime = function() {
        currentTime = this.sound.currentTime;
    }
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
    this.setCurrentTime = function(t) {
        this.sound.currentTime = t;
    }
}
