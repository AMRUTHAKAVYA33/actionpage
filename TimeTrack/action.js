let liveTime = document.getElementById("liveTime");
let todayDate = document.getElementById("todayDate");
let checkBtn = document.getElementById("checkBtn");

let effective = document.getElementById("effective");
let gross = document.getElementById("gross");
let sinceLogin = document.getElementById("sinceLogin");

let timerInterval = null;
let totalSeconds = 0;
let isCheckedIn = false;


/* ---------------- LIVE CLOCK ---------------- */

function updateClock(){
    let now = new Date();
    liveTime.innerText = now.toLocaleTimeString();
    todayDate.innerText = now.toDateString();
}
setInterval(updateClock,1000);
updateClock();


/* ---------------- LOAD DATA ---------------- */

window.onload = function(){

    let savedSeconds = localStorage.getItem("totalSeconds");
    let savedStatus = localStorage.getItem("isCheckedIn");

    if(savedSeconds){
        totalSeconds = parseInt(savedSeconds);
        updateDisplay();
    }

    if(savedStatus === "true"){
        startTimer();
    }
};


/* ---------------- START TIMER ---------------- */

function startTimer(){

    isCheckedIn = true;
    localStorage.setItem("isCheckedIn", true);

    checkBtn.innerText = "Check Out";
    checkBtn.style.background = "green";

    timerInterval = setInterval(function(){

        totalSeconds++;
        localStorage.setItem("totalSeconds", totalSeconds);

        updateDisplay();

    },1000);
}


/* ---------------- STOP TIMER ---------------- */

function stopTimer(){

    clearInterval(timerInterval);

    isCheckedIn = false;
    localStorage.setItem("isCheckedIn", false);

    checkBtn.innerText = "Check In";
    checkBtn.style.background = "#ff5c5c";
}


/* ---------------- UPDATE DISPLAY ---------------- */

function updateDisplay(){

    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    sinceLogin.innerText = hours + "h " + minutes + "m " + seconds + "s";
    effective.innerText = hours + "h " + minutes + "m " + seconds + "s";
    gross.innerText = hours + "h " + minutes + "m " + seconds + "s";
}


/* ---------------- BUTTON CLICK ---------------- */

checkBtn.addEventListener("click", function(){

    if(!isCheckedIn){
        startTimer();
    }else{
        stopTimer();
    }

});