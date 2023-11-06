// ***GLOBAL SELECTORS*** //

// Start Screen
const startQuizButton = document.querySelector('#start');

// Questions Screen
const questionsDiv = document.querySelector('#questions')
const questionText = questionsDiv.querySelector('h2');
const choices = document.querySelector('#choices');

const feedbackDiv = document.querySelector('#feedback');

const timeDiv = document.querySelector('.timer');
const timeSpan = document.querySelector('#time');


// End Screen
const finalScore = document.querySelector('#final-score');
const endScreenDiv = document.querySelector('#end-screen');
const endScreenHeader = endScreenDiv.querySelector('h2');
const initialsText = document.querySelector('#initials');
const submitScoreButton = document.querySelector('#submit');

const INIT_COUNTDOWN = 60;

let countdown = INIT_COUNTDOWN;
let timerStarted = false;
let questionNo = 0;
let score = 0;


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


// Starts Timer
function startTimer() {
    timerStarted = true;
    timeSpan.innerText = countdown;
    countdown--;
    
    // If it reaches 0, call finishGame()

    setInterval(function() {
        if (countdown < 0) {
            endScreenHeader.innerText = 'Time\'s Up!'
            return gameOver();
        }
        
        console.log(countdown)
        timeSpan.innerText = countdown;
        countdown--;
    } ,1000);
}


// Stops Timer
function stopTimer() {
    timeDiv.dataset.state = 'hide';
    timerStarted = false;
    countdown = INIT_COUNTDOWN;
}


// Updates feedback
function getFeedback(isCorrect) {
    // Selects feedback div
    const feedback = document.querySelector('#feedback')
    
    // Logic
    if (isCorrect) {
        feedback.innerText = 'Correct!';
        score+= 10
    } else {
        feedback.innerText = 'Wrong!';
        countdown -= 10;
    }
    
    // Shows feedback div
    feedback.dataset.state = 'show';
    updateElementVisibility();

    // Hide feedback
    setTimeout(function() {
        // Shows feedback div
        feedback.dataset.state = 'hide';
        updateElementVisibility();
    }, 2000);
}


// Clears Questions
function removeChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}


// Generates Next Question, if any
function nextQuestion() {
    
    console.log('questionNo:', questionNo)

    if  (questionNo < questions.length) {
        generateQuestion();
    } else {
        gameOver();
    }
    return;
}

function gameOver() {
    endScreenDiv.dataset.state = 'show';
    questionsDiv.dataset.state = "hide";
    timeDiv.dataset.state = "hide";
    updateElementVisibility();

    finalScore.innerText = score;
}


// Function to handle button clicks
function handleChoice(e) {
    const clickedBtn = e.target;

    // Runs only if one of the buttons were clicked and not just the parentDiv
    if (clickedBtn.tagName === 'BUTTON') {
        const selectedAnswerIndex = parseInt(clickedBtn.getAttribute('name'));

        if (selectedAnswerIndex === questions[questionNo].correctAnswerIndex) {
            getFeedback(true);
        } else {
            getFeedback(false);
        }

        questionNo++;
        nextQuestion();
    }
}


// Generates Question
function generateQuestion() {

    // Clear Screen
    removeChildren(questionText);
    removeChildren(choices);

    // Updates question
    let question = questions[questionNo];
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

    choices.removeEventListener('click', handleChoice);
    choices.addEventListener('click', handleChoice);



    return;
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
    if (!timerStarted) {
        startTimer();
    }

    console.log('questions.length:', questions.length);
    generateQuestion();
});


// Save Score
submitScoreButton.addEventListener('click', function() {
    let initials = initialsText.value;
    console.log(initials)
    let userScore = {}

    if (initials !== '') {
        userScore['score'] = score;
        userScore['initials'] = initials;
        console.log(userScore);
    } else {
        return;
    }
});