const detailsContainer = document.getElementById('details-container');
const countdownStartBtn = document.getElementById('countdown-start');

const countdownEl = document.getElementById('countdown');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const weddingDetailsBtn = document.getElementById('wedding-details');
const inviteContainer = document.getElementById('invite-container');
const ladiesSangeetContainer = document.getElementById('ladies-sangeet-container')
const inviteToDetailsBtn = document.getElementById('inviteToDetails');
const toLadiesSangeet = document.getElementById('to-ladies-sangeet');
const sangeetToDetailsBtn = document.getElementById('sangeetToDetails');
const completeToDetailsBtn = document.getElementById('completeToDetails');

let countdownDate = '2022-09-04';
let countdownValue = Date;
let countdownActive;
let savedCountdown;


const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set Date Input Min with Today's Date
const today = new Date().toISOString().split('T')[0];

// Populate Countdown / Complet UI
function updateDOM() {
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownValue - now;
        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);
        // Hide Details Container
        detailsContainer.hidden = true;
        // If the countdown has ended, show complete
        if (distance < 0) {
            countdownEl.hidden = true;
            clearInterval(countdownActive);
            completeEl.hidden = false;
        } else {
            // Else, show the countdown in progress
        timeElements[0].textContent = `${days}`;
        timeElements[1].textContent = `${hours}`;
        timeElements[2].textContent = `${minutes}`;
        timeElements[3].textContent = `${seconds}`;
        completeEl.hidden = true;
        inviteContainer.hidden = true;
        ladiesSangeetContainer.hidden = true;
        countdownEl.hidden = false;
        }
    }, second);
}

// Start Countdown
function updateCountdown() {
    savedCountdown = {
        date: countdownDate,
    };
    localStorage.setItem('countdown', JSON.stringify(savedCountdown));
    // Get number version of current Date, updateDOM
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
}

// Reset Countdown
function reset() {
    // Stop the countdown
    clearInterval(countdownActive);
    localStorage.removeItem('countdown');
    // Hide Countdown, show Input
    inviteContainer.hidden = true;
    countdownEl.hidden = true;
    completeEl.hidden = true;
    ladiesSangeetContainer.hidden = true;
    detailsContainer.hidden = false;
}

function restorePreviousCountdown() {
    // Get countdown from localStorage if available
    if (localStorage.getItem('countdown')) {
        detailsContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownDate  = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

function toInvite() {
    // Go to details container
    countdownEl.hidden = true;
    inviteContainer.hidden = true;
    completeEl.hidden = true;
    ladiesSangeetContainer.hidden = true;
    detailsContainer.hidden = false;
}

function toSangeet() {
    // Go to Ladies Sangeet container
    reset();
    detailsContainer.hidden = true;
    ladiesSangeetContainer.hidden = false;
}



// Event Listeners
countdownStartBtn.addEventListener('click', updateCountdown);
weddingDetailsBtn.addEventListener('click', reset);
inviteToDetailsBtn.addEventListener('click', toInvite);
toLadiesSangeet.addEventListener('click', toSangeet);
sangeetToDetailsBtn.addEventListener('click', toInvite);
completeToDetailsBtn.addEventListener('click', toInvite);


// On Load, check localStorage
restorePreviousCountdown();
