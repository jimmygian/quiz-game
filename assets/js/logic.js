// ***GLOBAL SELECTORS*** //

const startQuizButton = document.querySelector('#start');
const endScreenDiv = document.querySelector('#end-screen');
const questionsDiv = document.querySelector('#questions')
const feedbackDiv = document.querySelector('#feedback');
const timeDiv = document.querySelector('.timer');
const timeSpan = document.querySelector('#time');

let countdown = 120;

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


// Starts Countdown
function startCountdown() {
    timeSpan.innerText = countdown;
    countdown--;
    
    // If it reaches 0, call gameOver()
    
    setInterval(function() {
        timeSpan.innerText = countdown;
        countdown--;
    } ,1000);

}



// Generates Question
function generateQuestion() {
    console.log('I will generate a question');

    // Selectors
    const questionText = questionsDiv.querySelector('h2');
    console.log(questionText);
    const choices = document.querySelector('#choices');
    console.log(choices);

    // index
    index = 0;

    // Update question
    question = questions[index];
    questionText.innerText = question.question;
    
    // Create buttons
    for (let i = 0; i < question.answers.length; i++) {
        // Create New Choice Button
        const choiceBtn = document.createElement('button');

        // Set attributes
        choiceBtn.setAttribute('type','submit');
        choiceBtn.setAttribute('class','questionBtn');
        choiceBtn.setAttribute('name', i);
        choiceBtn.innerText = `${i+1}. ` + question.answers[i];
        
        // Append to 'choices' div
        choices.append(choiceBtn);
    }

    choices.addEventListener('click', function(e){
        console.log(e.target);
        clickedBtn = e.target;

        // Runs only if one of the buttons were clicked and not just the parentDiv
        if (clickedBtn.tagName === 'BUTTON') {
            const selectedAnswerIndex = parseInt(clickedBtn.getAttribute('name'));

            if (selectedAnswerIndex === question.correctAnswerIndex) {
                console.log("CORRECT!!!");
                // Update feedback
            } else {
                console.log("WRONG!!!");
                // Remove time from timer
                countdown -= 10;
            }
        }
    });
}



// ***EVENTS*** //

// Start quiz event listener
startQuizButton.addEventListener('click', function(e) {
    // Set custon property data-state to "hide"
    const parentDiv = startQuizButton.parentElement;
    parentDiv.dataset.state = "hide";
    questionsDiv.dataset.state = "show";
    timeDiv.dataset.state = "show";

    // Update visibility
    updateElementVisibility();
    
    // Start Game
    startCountdown();
    generateQuestion();
});