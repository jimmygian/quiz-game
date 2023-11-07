// Select
const clearButton = document.querySelector('#clear');
const highscoresList = document.querySelector('#highscores');

displayScores()

function displayScores() {
    // Remove items from high score list
    while (highscoresList.firstChild) {
        highscoresList.removeChild(highscoresList.firstChild);
    }

    //  Get stored score
    storedScores = JSON.parse(localStorage.getItem('userScore')) || {};
    storedScoresLength = Object.keys(storedScores).length;
    let arr = [];
    
    
    // Show scores from highest to lowest
    for (let key in storedScores) {
        arr.push({key: key, value: storedScores[key]})
    }
    
    // Sort array
    arr.sort(function(a, b) { 
        return b.value - a.value;
    });
    
    
    // Iterates through the sorted array and log key-value pairs
    for (let item of arr) {
    
    
        newLi = document.createElement('li');
        newLi.setAttribute('class', 'score-item');
        newLi.innerText = `${item.key} : ${item.value}`;
    
        highscoresList.append(newLi);
    
    }
}


clearButton.addEventListener('click', function(){
    localStorage.removeItem('userScore');
    displayScores()
});