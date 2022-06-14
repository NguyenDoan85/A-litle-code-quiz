// global variable
var time = document.querySelector(".timer");
var score = document.querySelector("#score");
var secondsLeft = 75;

// global const for button
const start = document.querySelector("#start");

// var for intro
const intro = document.querySelector("#challenge-begins");

// var for select all questions in the array
var questionsEl = document.querySelector(".all-question");

// located the element
let questionEl = document.querySelector("#question");
const correctWrong = document.querySelector("#right-wrong");
let questionCount = 0;


// located the final score section
const finalEl = document.querySelector("#final-score");
let initialsInput = document.querySelector("#initials");

// located and display high score 
const highScoreEl = document.querySelector("#high-scores");
let scoreListEl = document.querySelector(".score-list");
let scoreList = [];

// var for answer
const ansBtn = document.querySelectorAll("button.answer-btn")

// variable for submit, clear score, view score, and go back to the beginning
let submitScrBtn = document.querySelector("#submit-score");
let clearScrBtn = document.querySelector("#clearScores");
let viewScrBtn = document.querySelector("#view-scores");
let goBackBtn = document.querySelector("#goBack");


// calling the answer
const ans1Btn = document.querySelector("#answer-1");
const ans2Btn = document.querySelector("#answer-2");
const ans3Btn = document.querySelector("#answer-3");
const ans4Btn = document.querySelector("#answer-4");



// array of questions, answers, and correct answer
const questions = [ 
    {
        question: "Which operator returns true if the two compared values are not equal?",
        answers: ["1. <>", "2. ~", "3. ==!", "4. !=="],
        correctAnswer: "4"
    },
    {
        question: "Which statement creates a new object using the Person constructor? Which statement creates a new Person object called student?",
        answers: ["1. var student = new Person();", "2. var student = construct Person;", "3. var student = Person();", "4. var student = construct Person();"],
        correctAnswer: "1"
    },
    {
        question: "How does a function create a closure?",
        answers: ["1. It reloads the document whenever the value changes.", "2. It returns a reference to a variable in its parent scope.", "3. It completes execution without returning.", "4. It copies a local variable to the global scope."],
        correctAnswer: "2"
    },
    {
        question: "Which property references the DOM object that dispatched an event?",
        answers: ["1. self", "2. object", "3. target", "4. source"],
        correctAnswer: "3"
    },
    {
        question: "Which method converts JSON data to a JavaScript object?",
        answers: ["1. JSON.fromString();", "2. JSON.parse()", "3. JSON.toObject()", "4. JSON.stringify()"],
        correctAnswer: "2"
    },
    {
        question: "Which of the following is not a keyword in JavaScript?",
        answers: ["1. this;", "2. catch", "3. function", "4. array"],
        correctAnswer: "4"
    }
];

// timer function 
function setTime() {
    let timerInterval = setInterval(function () {
        secondsLeft--;
        time.textContent = `Time:${secondsLeft}s`;

        if (secondsLeft === 0 || questionCount === questions.length) {
            clearInterval(timerInterval);
            questionsEl.style.display = "none";
            finalEl.style.display = "block";
            score.textContent = secondsLeft;
        }
    }, 1000);
}

// begin quiz function
function startQuiz() {
    intro.style.display = "none";
    questionsEl.style.display = "block";
    questionCount = 0;

    setTime();
    setQuestion(questionCount);
}

// set question function
function setQuestion(i) {
    if (i < questions.length) {
        questionEl.textContent = questions[i].question;
        ans1Btn.textContent = questions[i].answers[0];
        ans2Btn.textContent = questions[i].answers[1];
        ans3Btn.textContent = questions[i].answers[2];
        ans4Btn.textContent = questions[i].answers[3];
    }
}

// checking answer correct or wrong function
function checkAnswer(event) {
    event.preventDefault();

    //adding a p for right and wrong statement
    correctWrong.style.display = "block";
    let p = document.createElement("p");
    correctWrong.appendChild(p);

    // timer counting
    setTimeout(function () {
        p.style.display = 'none';
    }, 1000);

    // correct answer statement
    if (questions[questionCount].correctAnswer === event.target.value) {
        p.textContent = "Correct!";
    } 
   
     // wrong answer statement, and minus 10 second
    else if (questions[questionCount].correctAnswer !== event.target.value) {
        secondsLeft = secondsLeft - 10;
        p.textContent = "Wrong!";
    }

    // display the next question 
    if (questionCount < questions.length) {
        questionCount++;
    }
    setQuestion(questionCount);
}

// function to adding time score
function addScore(event) {
    event.preventDefault();

    finalEl.style.display = "none";
    highScoreEl.style.display = "block";

    let init = initialsInput.value.toUpperCase();
    scoreList.push({ initials: init, score: secondsLeft });

    // score list
    scoreList = scoreList.sort((a, b) => {
        if (a.score < b.score) {
          return 1;
        } else {
          return -1;
        }
      });
    
    scoreListEl.innerHTML="";
    for (let i = 0; i < scoreList.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${scoreList[i].initials}: ${scoreList[i].score}`;
        scoreListEl.append(li);
    }

    // save score to storage 
    storeScores();
    displayScores();
}

// convert value to string
function storeScores() {
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
}

// display score function
function displayScores() {
    // parsing the JSON string to an object
    let storedScoreList = JSON.parse(localStorage.getItem("scoreList")); 
    if (storedScoreList !== null) {
        scoreList = storedScoreList;
    }
}

// clear the storage
function clearScores() {
    localStorage.clear();
    scoreListEl.innerHTML="";
}

// listen to the click
start.addEventListener("click", startQuiz);

ansBtn.forEach(item => {
    item.addEventListener('click', checkAnswer);
});

submitScrBtn.addEventListener("click", addScore);

goBackBtn.addEventListener("click", function () {
    highScoreEl.style.display = "none";
    intro.style.display = "block";
    secondsLeft = 75;
    time.textContent = `Time:${secondsLeft}s`;
});

clearScrBtn.addEventListener("click", clearScores);

viewScrBtn.addEventListener("click", function () {
    if (highScoreEl.style.display === "none") {
        highScoreEl.style.display = "block";
    } 
    else if (highScoreEl.style.display === "block") {
        highScoreEl.style.display = "none";
    } 
    
    else {
        return alert("There is no high score yet, please take the quiz!");
    }
});
