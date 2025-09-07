const sections = [
    {
        name: "Dierenrijmen",
        questions: [
            { stem: "Muis", correct: "huis", choices: ["huis", "boom"] },
            { stem: "Kat", correct: "plat", choices: ["plat", "man"] },
            { stem: "Beer", correct: "meer", choices: ["meer", "steen"] },
            { stem: "Haas", correct: "baas", choices: ["baas", "schaap"] },
            { stem: "Hond", correct: "mond", choices: ["mond", "neus"] },
            { stem: "Koe", correct: "toe", choices: ["toe", "stoel"] },
            { stem: "Vogel", correct: "toren", choices: ["toren", "wagen"] },
            { stem: "Geit", correct: "feit", choices: ["feit", "groot"] },
            { stem: "Vis", correct: "is", choices: ["is", "heet"] },
            { stem: "Schaap", correct: "slaap", choices: ["slaap", "zwaaien"] }
        ]
    },
    {
        name: "Eenvoudige Woorden",
        questions: [
            { stem: "Tas", correct: "jas", choices: ["jas", "pen"] },
            { stem: "Pen", correct: "hen", choices: ["hen", "boek"] },
            { stem: "Bus", correct: "kus", choices: ["kus", "trein"] },
            { stem: "Man", correct: "kan", choices: ["kan", "kind"] },
            { stem: "Boot", correct: "groot", choices: ["groot", "klein"] },
            { stem: "Zon", correct: "komt", choices: ["komt", "maan"] },
            { stem: "Schoen", correct: "doen", choices: ["doen", "lopen"] },
            { stem: "Nee", correct: "zee", choices: ["zee", "ja"] },
            { stem: "Hoed", correct: "goed", choices: ["goed", "vies"] },
            { stem: "Bal", correct: "hal", choices: ["hal", "raam"] }
        ]
    },
    {
        name: "Speelgoed en Spelletjes",
        questions: [
            { stem: "Pop", correct: "stop", choices: ["stop", "weg"] },
            { stem: "Bal", correct: "hal", choices: ["hal", "raam"] },
            { stem: "Blok", correct: "klok", choices: ["klok", "huis"] },
            { stem: "Trein", correct: "klein", choices: ["klein", "groot"] },
            { stem: "Poes", correct: "doos", choices: ["doos", "hond"] },
            { stem: "Toren", correct: "oren", choices: ["oren", "neus"] },
            { stem: "Kussen", correct: "tussen", choices: ["tussen", "vallen"] },
            { stem: "Wip", correct: "kip", choices: ["kip", "stoel"] },
            { stem: "Kleur", correct: "deur", choices: ["deur", "muur"] },
            { stem: "Puzzel", correct: "huppel", choices: ["huppel", "rennen"] }
        ]
    },
    {
        name: "Lichaamsdelen",
        questions: [
            { stem: "Haar", correct: "daar", choices: ["daar", "hand"] },
            { stem: "Oor", correct: "voor", choices: ["voor", "neus"] },
            { stem: "Mond", correct: "hond", choices: ["hond", "kat"] },
            { stem: "Been", correct: "steen", choices: ["steen", "voet"] },
            { stem: "Hand", correct: "sand", choices: ["sand", "vuist"] },
            { stem: "Buik", correct: "duik", choices: ["duik", "eten"] },
            { stem: "Neus", correct: "keus", choices: ["keus", "mond"] },
            { stem: "Vinger", correct: "zwemmer", choices: ["zwemmer", "arm"] },
            { stem: "Teen", correct: "steen", choices: ["steen", "voet"] },
            { stem: "Voet", correct: "moet", choices: ["moet", "schoen"] }
        ]
    },
    {
        name: "Eten en Drinken",
        questions: [
            { stem: "Appel", correct: "stoppel", choices: ["stoppel", "fruit"] },
            { stem: "Boter", correct: "motor", choices: ["motor", "mes"] },
            { stem: "Melk", correct: "melk", choices: ["melk", "water"] },
            { stem: "Soep", correct: "poep", choices: ["poep", "lepel"] },
            { stem: "Brood", correct: "groot", choices: ["groot", "klein"] },
            { stem: "Cake", correct: "rake", choices: ["rake", "stuk"] },
            { stem: "Rijst", correct: "lijst", choices: ["lijst", "pan"] },
            { stem: "Pannenkoek", correct: "boek", choices: ["boek", "bord"] },
            { stem: "Worst", correct: "dorst", choices: ["dorst", "hap"] },
            { stem: "Sap", correct: "hap", choices: ["hap", "glas"] }
        ]
    }
];

let currentSectionIndex;
let currentQuestionIndex;
let score = 0;

const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const sectionButtonsContainer = document.querySelector('.section-buttons');

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
}

function startQuiz(sectionIndex) {
    currentSectionIndex = sectionIndex;
    currentQuestionIndex = 0;
    score = 0;
    startScreen.style.display = 'none';
    resultsScreen.style.display = 'none';
    quizScreen.style.display = 'block';
    loadQuestion();
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function loadQuestion() {
    const currentSection = sections[currentSectionIndex];
    const currentQuestion = currentSection.questions[currentQuestionIndex];
    document.getElementById('progress').textContent = `Vraag ${currentQuestionIndex + 1} van ${currentSection.questions.length}`;
    document.getElementById('question-stem').textContent = `Wat rijmt op... ${currentQuestion.stem}?`;
    
    const choicesArea = document.getElementById('choices-area');
    choicesArea.innerHTML = '';

    const shuffledChoices = shuffle([...currentQuestion.choices]);

    shuffledChoices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.onclick = () => checkAnswer(choice);
        choicesArea.appendChild(button);
    });
}

function endQuiz() {
    quizScreen.style.display = 'none';
    resultsScreen.style.display = 'block';
    const currentSection = sections[currentSectionIndex];
    const message = `Goed gedaan! Je hebt ${score} van de ${currentSection.questions.length} vragen goed.`;
    document.getElementById('results-message').textContent = message;
}

function checkAnswer(selectedChoice) {
    const currentSection = sections[currentSectionIndex];
    const currentQuestion = currentSection.questions[currentQuestionIndex];
    const buttons = document.querySelectorAll('.choices button');
    
    buttons.forEach(button => {
        button.disabled = true;
        if (button.textContent === currentQuestion.correct) {
            button.style.backgroundColor = '#28a745';
        }
        if (button.textContent === selectedChoice && selectedChoice !== currentQuestion.correct) {
            button.style.backgroundColor = '#dc3545';
        }
    });

    if (selectedChoice === currentQuestion.correct) {
        score++;
    }

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < currentSection.questions.length) {
            loadQuestion();
        } else {
            endQuiz();
        }
    }, 1500);
}

// Start the quiz when the page loads
window.onload = initialize;
