var arm = document.getElementById("tonearm");
dragElement(arm);
var realArm = document.getElementById("actualArm");
var armAngle;
var INIT = -10;
initAngle();

var dummy = document.getElementById("arm-dummy");
var armX;
var armY;

window.setInterval(updateArm, 0);
window.setInterval(updateXandY, 0);
//window.setInterval(printNow, 0);

function initAngle() {
    armAngle = INIT;
}

function updateArm() {

    arm.style.transform = "rotate(" + armAngle + "deg)";
    if (canPlay()) {
        if (!playing) {
            playing = true;
            var percent = ((armAngle - 5)/35.0);
            song.updateDuration();
            song.setCurrentTime(percent * duration);
            song.play();
        }
    }
    if (playing) {
        song.updateTime();
        armAngle = (currentTime / duration) * 35 + 5;
        realArm.style.marginTop = -Math.random() * 2 + "px";
        if (dragging || !spinning || armAngle >= 40) {
            playing = false;
            song.stop();
        }
    }
}

function canPlay() {
    return (spinning && !dragging && armAngle < 40 && armAngle > 5);
}

function updateXandY() {
    armX = getX(dummy);
    armY = getY(dummy);
}

function printNow() {
    //console.log(armAngle);
}


function getX(e) {
    var rect = e.getBoundingClientRect();
    return rect.left;
}

function getY(e) {
    var rect = e.getBoundingClientRect();
    return rect.bottom;
}

function dragElement(elmnt) {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;

    // otherwise, move the DIV from anywhere inside the DIV: 
    elmnt.onmousedown = dragMouseDown;
    elmnt.ontouchstart = dragMouseDown;


    function dragMouseDown(e) {
        realArm.classList.add("lifted");
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        dragging = true;

        document.onmouseup = closeDragElement;
        document.ontouchend = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
        document.ontouchmove = elementDragTouch;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;

        var mouseX = e.clientX;
        var mouseY = e.clientY;

        var diffX = armX - mouseX;
        var diffY = armY - mouseY;

        var angle = Math.atan2(diffY, diffX);

        angle *= 180 / Math.PI;
        angle += 90;

        if (angle >= INIT && angle <= 40) {
            armAngle = angle;
        }
        if (armAngle > 3 && armAngle < 8) {
            armAngle = 5.0001;
        }
    }
        
    function elementDragTouch(e) {
        e.preventDefault();
        
        var touch = e.touches[0];
        var mouseX = touch.pageX;
        var mouseY = touch.pageY;

        var diffX = armX - mouseX;
        var diffY = armY - mouseY;

        var angle = Math.atan2(diffY, diffX);

        angle *= 180 / Math.PI;
        angle += 90;

        if (angle >= INIT && angle <= 40) {
            armAngle = angle;
        }
        if (armAngle > 3 && armAngle < 8) {
            armAngle = 5.0001;
        }
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        dragging = false;
        realArm.classList.toggle("lifted");
        document.onmouseup = null;
        document.onmousemove = null;
    }
}