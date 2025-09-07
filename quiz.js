// Add these new lines at the very top of your file, with your other variables
const HIGHSCORE_KEY = 'rijmQuizScores'; // A unique key to identify our scores in localStorage

// Modified endQuiz() function
function endQuiz() {
    quizScreen.style.display = 'none';
    resultsScreen.style.display = 'block';
    const currentSection = sections[currentSectionIndex];
    const message = `Goed gedaan! Je hebt ${score} van de ${currentSection.questions.length} vragen goed.`;
    document.getElementById('results-message').textContent = message;

    // Call the function to save the score
    saveScore();
    // Call the function to display all scores
    displayHighScores();
}

// New function to save the score to localStorage
function saveScore() {
    // Get the previous scores, or an empty array if none exist
    const scores = JSON.parse(localStorage.getItem(HIGHSCORE_KEY)) || [];

    // Create a new score object
    const newScore = {
        score: score,
        date: new Date().toLocaleDateString('nl-NL'),
        section: sections[currentSectionIndex].name
    };

    // Add the new score to the list
    scores.push(newScore);

    // Save the updated list back to localStorage
    localStorage.setItem(HIGHSCORE_KEY, JSON.stringify(scores));
}

// New function to display all the scores
function displayHighScores() {
    const scores = JSON.parse(localStorage.getItem(HIGHSCORE_KEY)) || [];
    const highScoresList = document.getElementById('high-scores-list');
    
    // Clear the list first
    highScoresList.innerHTML = '';
    
    if (scores.length === 0) {
        highScoresList.innerHTML = '<li>Nog geen scores om weer te geven.</li>';
    } else {
        // Sort scores from highest to lowest
        scores.sort((a, b) => b.score - a.score);

        // Display the top 5 scores
        scores.slice(0, 5).forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${index + 1}. ${item.score} punten - ${item.section} (${item.date})`;
            highScoresList.appendChild(listItem);
        });
    }
}

// Update the initialize() function to call the display function
function initialize() {
    startScreen.style.display = 'block';
    quizScreen.style.display = 'none';
    resultsScreen.style.display = 'none';
    sectionButtonsContainer.innerHTML = '';
    sections.forEach((section, index) => {
        const button = document.createElement('button');
        button.textContent = section.name;
        button.onclick = () => startQuiz(index);
        sectionButtonsContainer.appendChild(button);
    });

    // Call the high score display function when the page loads
    displayHighScores();
}
