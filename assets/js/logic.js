// ***GLOBAL SELECTORS*** //

const startQuizButton = document.querySelector('#start');
const endScreenDiv = document.querySelector('#end-screen');
const questionScreenDiv = document.querySelector('#question-screen')
const feedbackDiv = document.querySelector('#feedback');
const timeSpan = document.querySelector('#time');



// ***FUNCTIONS*** //

// Updates element visibility
function updateElementVisibility() {
    const elementsToControl = document.querySelectorAll('[data-state]');
    
    // Run for each element that has a 'data-state' attribute
    elementsToControl.forEach(function(element) {
        // Get date-state value
        const dataState = element.getAttribute('data-state');
        
        if (dataState === 'show') {
            element.classList.remove('hide');
            element.classList.add('show');
        } else if (dataState === 'hide') {
            element.classList.remove('show');
            element.classList.add('hide');
        }
    });
}

// Generates Question
function generateQuestion() {
    console.log('I will generate a question');
}



// ***EVENTS*** //

// Start quiz event listener
startQuizButton.addEventListener('click', function(e) {
    // Set custon property data-state to "hide"
    const parentDiv = startQuizButton.parentElement;
    parentDiv.dataset.state = "hide";
    questionScreenDiv.dataset.state = "show";
    updateElementVisibility();
    generateQuestion();
});