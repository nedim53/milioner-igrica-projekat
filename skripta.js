// Game state management
const gameState = {
    currentLevel: 1,
    currentQuestion: null,
    correctAnswers: 0,
    moneyWon: 0,
    isGameActive: false,
    usedQuestions: new Set(),
    lifelines: {
        fiftyFifty: true,
        phoneCall: true,
        audienceHelp: true
    }
};

// Prize money configuration
const PRIZE_MONEY = {
    1: 100,
    2: 200,
    3: 300,
    4: 500,
    5: 1000,
    6: 2000,
    7: 4000,
    8: 8000,
    9: 16000,
    10: 32000,
    11: 64000,
    12: 125000,
    13: 250000,
    14: 500000,
    15: 1000000
};

// Safe havens (guaranteed money)
const SAFE_HAVENS = [5, 10, 15];

// Questions database
const questions = {
    level1: [
        {        pitanje: "Koja je vrednost π (pi) ?",
            odgovori: ["3.14", "2.71", "1.62", "4.20"],
            tacanOdgovor: "3.14"
        },
        {
            pitanje: "Kako se zove teorema koja se odnosi na trouglove i koja počinje sa :a^2 + b^2 = c^2?",
               odgovori: ["Fermatova teorema", "Heronova teorema", "Euklidova teorema", "Pitagorina teorema"],
            tacanOdgovor: "Pitagorina teorema"
        },
        {
            pitanje: "Koji je korijen broja 64?",
        odgovori: ["38 stepeni", "8", "64", "a+b=c"],
            tacanOdgovor: "8"
        },
        {        pitanje: "Šta znači skraćenica HTML?",
            odgovori: ["HyperTransfer Markup Language", "High-Level Text Management Language", "HyperText Markup Language", "Hyper znanje kodova"],
            tacanOdgovor: "HyperText Markup Language"
        },
        {
            pitanje: "Koje jezike koristimo za stilizaciju web stranica?",
            odgovori: ["CSS (Cascading Style Sheets)", "HTML (HyperText Markup Language)", "Python", "C++"],
            tacanOdgovor: "CSS (Cascading Style Sheets)"
        },
        {
            pitanje: "Šta znači pojam 'bug' u programiranju?",
            odgovori: ["Da sve radi perfektno", "Greška u kodu", "Buba na ekranu", "Mali insekt koji ometa rad računara"],
            tacanOdgovor: "Greška u kodu"
        },
        {
            pitanje: "Koliko stepeni ima jedan krug?",
            odgovori: ["360", "90", "180", "69.01"],
            tacanOdgovor: "360"
        },
        {
            pitanje: "Ko je bio Albert Einstein?",
            odgovori: ["Poznati njemački fizičar", "Predsjednik Albanije u toku Drugog Svjetskog rata", "Poznati poljski fudbaler", "Poznati austrijski hemičar"],
            tacanOdgovor: "Poznati njemački fizičar"
        }
    ],
    level2: [
        {
            pitanje: "Šta predstavlja akronim 'HTTP'?",
            odgovori: ["HyperText Transfer Protocol", "High-Level Text Processing", "HyperTransfer Text Protocol", "HyperText Technical Process"],
            tacanOdgovor: "HyperText Transfer Protocol"
        },
        {
            pitanje: "Kako se naziva proces dodeljivanja imena varijablama u programiranju?",
            odgovori: ["Definisanje", "Delegiranje", "Deklaracija", "Inicijalizacija"],
            tacanOdgovor: "Deklaracija"
        },
        {
            pitanje: "Šta je operator '==' u programskom jeziku JavaScript?",
            odgovori: ["Operator jednakosti", "Operator identiteta", "Operator poređenja", "Operator dodjele"],
            tacanOdgovor: "Operator poređenja"
        },
        {
            pitanje: "Koliko bita čini jedan bajt?",
            odgovori: ["4", "8", "16", "32"],
            tacanOdgovor: "8"
        },
        {
            pitanje: "Šta je petlja ('loop') u programiranju?",
            odgovori: ["Vrsta podataka", "Sintaksna greška", "Struktura za kontrolu toka programa", "Funkcija za unos podataka"],
            tacanOdgovor: "Struktura za kontrolu toka programa"
        },
        {
            pitanje: "Kako se nazivaju osnovne aritmetičke operacije (sabiranje, oduzimanje, množenje, deljenje)?",
            odgovori: ["Trigonometrijske funkcije", "Geometrijske operacije", "Algebarske operacije", "Logičke operacije"],
            tacanOdgovor: "Algebarske operacije"
        },
        {
            pitanje: "Šta predstavlja pojam 'boolean' u programiranju?",
            odgovori: ["Vrsta podataka koja ima samo dva moguća stanja: tačno ili netačno", "Specifična vrsta greške", "Skup instrukcija za rad sa tekstualnim podacima", "Programski jezik"],
            tacanOdgovor: "Vrsta podataka koja ima samo dva moguća stanja: tačno ili netačno"
        },
        {
            pitanje: "Šta su nizovi (arrays) u programiranju?",
            odgovori: ["Skup instrukcija za rad sa matricama", "Struktura podataka koja čuva više vrednosti pod jednim imenom", "Vrsta greške u programiranju", "Operator za unos podataka"],
            tacanOdgovor: "Struktura podataka koja čuva više vrednosti pod jednim imenom"
        }
    ],
    level3: [
        {
            pitanje: "Ko je autor JavaScript jezika?",
            odgovori: ["Brendan Eich", "Mark Zuckerberg", "Bill Gates", "Larry Page"],
            tacanOdgovor: "Brendan Eich"
        },
        {
            pitanje: "Šta predstavlja skraćenica 'API'?",
            odgovori: ["Application Programming Interface", "Advanced Programming Interface", "Automated Programming Interface", "Application Processing Interface"],
            tacanOdgovor: "Application Programming Interface"
        },
        {
            pitanje: "Koji HTTP status kod označava 'Not Found' grešku?",
            odgovori: ["200", "404", "500", "302"],
            tacanOdgovor: "404"
        },
        {
            pitanje: "Šta znači akronim 'SQL'?",
            odgovori: ["Structured Language", "Simple Question Language", "Standard Query Language", "System Query Language"],
            tacanOdgovor: "Standard Query Language"
        },
        {
            pitanje: "Koja od navedenih nije JavaScript biblioteka/framework?",
            odgovori: ["React", "Angular", "Vue", "JavaFX"],
            tacanOdgovor: "JavaFX"
        },
        {
            pitanje: "Koja od naredbi se koristi za kreiranje nove grane u Git-u?",
            odgovori: ["git branch", "git commit", "git merge", "git clone"],
            tacanOdgovor: "git branch"
        },
        {
            pitanje: "Koja od naredbi se koristi za instalaciju paketa u Node.js okruženju?",
            odgovori: ["npm install", "node install", "package install", "install npm"],
            tacanOdgovor: "npm install"
        },
        {
            pitanje: "Koje od navedenih nije programski jezik?",
            odgovori: ["Java", "MySQL", "Python", "Ruby"],
            tacanOdgovor: "MySQL"
        }
    ]
};

// Audio elements
const sounds = {
    correct: document.getElementById('tzvuk'),
    wrong: document.getElementById('pzvuk'),
    victory: document.getElementById('pobjeda'),
    defeat: document.getElementById('poraz')
};

// DOM Elements
let elements = {
    questionText: null,
    answerButtons: [],
    startButton: null,
    playerName: null,
    moneyDisplay: null,
    prizeItems: []
};

// Initialize game
document.addEventListener('DOMContentLoaded', () => {
    // Initialize DOM elements
    elements = {
        questionText: document.getElementById('ovdepitanje'),
        answerButtons: [
            document.getElementById('pitanje1'),
            document.getElementById('pitanje2'),
            document.getElementById('pitanje3'),
            document.getElementById('pitanje4')
        ],
        startButton: document.getElementById('generisi'),
        playerName: document.getElementById('prikazImenaPrezimena'),
        moneyDisplay: document.getElementById('kolikopara'),
        prizeItems: Array.from({length: 15}, (_, i) => document.getElementById(String(i + 1)))
    };

    setupEventListeners();
    updatePlayerInfo();
});

function setupEventListeners() {
    if (elements.answerButtons) {
        elements.answerButtons.forEach(button => {
            if (button) {
                button.addEventListener('click', handleAnswer);
            }
        });
    }
    
    if (elements.startButton) {
        elements.startButton.addEventListener('click', startGame);
    }
}

function updatePlayerInfo() {
    const playerName = localStorage.getItem('imePrezime');
    if (playerName && elements.playerName) {
        elements.playerName.textContent = playerName;
        localStorage.removeItem('imePrezime');
    }
}

function startGame() {
    if (!elements.questionText || !elements.answerButtons) return;
    
    gameState.isGameActive = true;
    gameState.currentLevel = 1;
    gameState.correctAnswers = 0;
    gameState.moneyWon = 0;
    
    if (elements.startButton) {
        elements.startButton.style.display = 'none';
    }
    
    generateQuestion();
}

function generateQuestion() {
    let currentQuestions;
    switch(gameState.currentLevel) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            currentQuestions = questions.level1;
            break;
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
            currentQuestions = questions.level2;
            break;
        default:
            currentQuestions = questions.level3;
    }

    const availableQuestions = currentQuestions.filter(q => !gameState.usedQuestions.has(q.pitanje));
    
    if (availableQuestions.length === 0) {
        endGame(true);
        return;
    }

    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const question = availableQuestions[randomIndex];
    gameState.currentQuestion = question;
    gameState.usedQuestions.add(question.pitanje);

    displayQuestion(question);
}

function displayQuestion(question) {
    if (!elements.questionText || !elements.answerButtons) return;
    
    elements.questionText.textContent = question.pitanje;
    
    // Shuffle answers
    const shuffledAnswers = [...question.odgovori].sort(() => Math.random() - 0.5);
    
    elements.answerButtons.forEach((button, index) => {
        if (button) {
            button.textContent = shuffledAnswers[index];
            button.className = 'answer-btn';
            button.disabled = false;
        }
    });

    // Highlight current prize level
    if (elements.prizeItems) {
        elements.prizeItems.forEach((item, index) => {
            if (item) {
                item.classList.toggle('active', index + 1 === gameState.currentLevel);
            }
        });
    }
}

function handleAnswer(event) {
    if (!gameState.isGameActive || !elements.questionText) return;

    const selectedAnswer = event.target.textContent;
    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion) return;
    
    const isCorrect = selectedAnswer === currentQuestion.tacanOdgovor;

    // Disable all answer buttons
    elements.answerButtons.forEach(button => {
        if (button) button.disabled = true;
    });

    // Show correct/wrong answer
    elements.answerButtons.forEach(button => {
        if (!button) return;
        
        if (button.textContent === currentQuestion.tacanOdgovor) {
            button.classList.add('correct');
        } else if (button === event.target && !isCorrect) {
            button.classList.add('wrong');
        }
    });

    if (isCorrect) {
        handleCorrectAnswer();
    } else {
        handleWrongAnswer();
    }
}

function getCurrentQuestion() {
    if (!elements.questionText) return null;
    
    let currentQuestions;
    switch(gameState.currentLevel) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            currentQuestions = questions.level1;
            break;
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
            currentQuestions = questions.level2;
            break;
        default:
            currentQuestions = questions.level3;
    }
    return currentQuestions.find(q => q.pitanje === elements.questionText.textContent);
}

function handleCorrectAnswer() {
    if (sounds.correct) sounds.correct.play();
    
    gameState.correctAnswers++;
    gameState.moneyWon = PRIZE_MONEY[gameState.currentLevel];
    
    // Update UI
    if (elements.moneyDisplay) {
        elements.moneyDisplay.textContent = `Osvojena količina: $${gameState.moneyWon}`;
    }
    
    if (elements.prizeItems && elements.prizeItems[gameState.currentLevel - 1]) {
        elements.prizeItems[gameState.currentLevel - 1].classList.add('correct');
    }
    
    // Check if it's a safe haven
    if (SAFE_HAVENS.includes(gameState.currentLevel)) {
        showSafeHavenMessage();
    }

    // Move to next question after delay
    setTimeout(() => {
        if (gameState.currentLevel < 15) {
            gameState.currentLevel++;
            generateQuestion();
        } else {
            endGame(true);
        }
    }, 2000);
}

function handleWrongAnswer() {
    if (sounds.wrong) sounds.wrong.play();
    
    if (elements.prizeItems && elements.prizeItems[gameState.currentLevel - 1]) {
        elements.prizeItems[gameState.currentLevel - 1].classList.add('wrong');
    }
    
    // Find the last safe haven
    const lastSafeHaven = SAFE_HAVENS.filter(level => level < gameState.currentLevel).pop();
    gameState.moneyWon = lastSafeHaven ? PRIZE_MONEY[lastSafeHaven] : 0;
    
    setTimeout(() => endGame(false), 2000);
}

function showSafeHavenMessage() {
    const message = document.createElement('div');
    message.className = 'safe-haven-message';
    message.textContent = 'Čestitamo! Osigurali ste novčanu nagradu!';
    document.body.appendChild(message);
    
    setTimeout(() => message.remove(), 3000);
}

function endGame(isVictory) {
    gameState.isGameActive = false;
    
    if (isVictory) {
        if (sounds.victory) sounds.victory.play();
        showEndGameMessage('Čestitamo! Osvojili ste $1,000,000!');
        setTimeout(() => {
            window.location.href = 'dobitnik.html';
        }, 3000);
    } else {
        if (sounds.defeat) sounds.defeat.play();
        showEndGameMessage(`Igra je završena! Osvojili ste $${gameState.moneyWon}`);
        setTimeout(() => {
            // Redirect based on prize amount
            if (gameState.moneyWon === 1000) {
                window.location.href = 'petica.html';
            } else if (gameState.moneyWon === 32000) {
                window.location.href = 'cener.html';
            } else {
                window.location.href = 'luzer.html';
            }
        }, 3000);
    }
}

function showEndGameMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'end-game-message';
    messageElement.textContent = message;
    document.body.appendChild(messageElement);
}

// Lifeline functions
function useFiftyFifty() {
    if (!gameState.lifelines.fiftyFifty || !gameState.isGameActive) return;
    
    const wrongAnswers = gameState.currentQuestion.odgovori
        .filter(answer => answer !== gameState.currentQuestion.tacanOdgovor)
        .sort(() => Math.random() - 0.5)
        .slice(0, 2);
    
    elements.answerButtons.forEach(button => {
        if (wrongAnswers.includes(button.textContent)) {
            button.disabled = true;
            button.style.opacity = '0.5';
        }
    });
    
    gameState.lifelines.fiftyFifty = false;
}

function usePhoneCall() {
    if (!gameState.lifelines.phoneCall || !gameState.isGameActive) return;
    
    const correctAnswer = gameState.currentQuestion.tacanOdgovor;
    const confidence = Math.random();
    
    let message;
    if (confidence > 0.7) {
        message = `Mislim da je odgovor "${correctAnswer}"`;
    } else if (confidence > 0.4) {
        message = `Nisam siguran, ali mislim da je "${correctAnswer}"`;
    } else {
        message = "Izvinite, ne znam odgovor na ovo pitanje";
    }
    
    showLifelineMessage(message);
    gameState.lifelines.phoneCall = false;
}

function useAudienceHelp() {
    if (!gameState.lifelines.audienceHelp || !gameState.isGameActive) return;
    
    const correctAnswer = gameState.currentQuestion.tacanOdgovor;
    const answers = gameState.currentQuestion.odgovori;
    
    // Generate fake audience percentages
    const percentages = answers.map(answer => {
        if (answer === correctAnswer) {
            return Math.floor(Math.random() * 30) + 40; // 40-70% for correct answer
        }
        return Math.floor(Math.random() * 30); // 0-30% for wrong answers
    });
    
    // Normalize percentages to sum to 100
    const total = percentages.reduce((a, b) => a + b, 0);
    const normalizedPercentages = percentages.map(p => Math.round((p / total) * 100));
    
    showAudienceResults(normalizedPercentages);
    gameState.lifelines.audienceHelp = false;
}

function showLifelineMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'lifeline-message';
    messageElement.textContent = message;
    document.body.appendChild(messageElement);
    
    setTimeout(() => messageElement.remove(), 5000);
}

function showAudienceResults(percentages) {
    const resultsContainer = document.createElement('div');
    resultsContainer.className = 'audience-results';
    
    elements.answerButtons.forEach((button, index) => {
        const result = document.createElement('div');
        result.className = 'audience-result';
        result.textContent = `${button.textContent}: ${percentages[index]}%`;
        resultsContainer.appendChild(result);
    });
    
    document.body.appendChild(resultsContainer);
    setTimeout(() => resultsContainer.remove(), 5000);
}