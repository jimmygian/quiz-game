// Selectors
const clearButton = document.querySelector('#clear');
const highscoresList = document.querySelector('#highscores');

// Calls Display Scores
displayScores()


function displayScores() {
    // Removes items from high score list, one by one, until no list items are present
    while (highscoresList.firstChild) {
        highscoresList.removeChild(highscoresList.firstChild);
    }

    //  Gets stored score OR empty object
    storedScores = JSON.parse(localStorage.getItem('userScore')) || {};
    storedScoresLength = Object.keys(storedScores).length;
    
    // Stores scores in an array and sorts them from highest to lowest
    let arr = [];
    for (let key in storedScores) {
        arr.push({key: key, value: storedScores[key]})
    }
    
    /* Documentation of .sort method:
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    */
   // Sorts array (using .sort(callback) method)
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

// Clears stored Scores from localStorage
clearButton.addEventListener('click', function(){
    localStorage.removeItem('userScore');
    displayScores()
});