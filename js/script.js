var flipped = false;
var spinning = false;
var dragging = false;
var playing = false;
window.setInterval(flipCheck, 0);

function flipIt() {
    var content = document.getElementById('flip-content');
    
    var icon = document.getElementById('button-icon');

    if (!flipped) {
        content.style.transform = 'rotateY(180deg)';
        
        icon.classList.add('fa-music');
        icon.classList.remove('fa-question');
        
        flipped = true;
    } else {
        content.style.transform = 'rotateY(0deg)';
        
        icon.classList.add('fa-question');
        icon.classList.remove('fa-compact-disk');
        
        flipped = false;
    }
}

function spinIt() {
    var record = document.getElementById('record');
    
    var button = document.getElementById('spinButton');
    
    record.classList.toggle('paused');
    spinning = !spinning;
    
    if (spinning) {
        button.style.transform = "rotate(90deg)";
    } else {
        button.style.transform = "rotate(0deg)";
        
    }
}

function flipCheck() {
    var button = document.getElementById('spinButton');
    var arm = document.getElementById('tonearm');
    var record = document.getElementById('record');
    
    if (flipped) {
        button.style.pointerEvents = "none";
        arm.style.pointerEvents = "none";
        record.style.pointerEvents = "none";
    } else {
        button.style.pointerEvents = "auto";
        arm.style.pointerEvents = "auto";
        record.style.pointerEvents = "none";
    }
}


