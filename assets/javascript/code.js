var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');

// create my array of questions and answers
var myQuestions = [
    {
        question: "Which operator returns true if the two compared values are not equal?",
        answers: {
            a: '<>',
            b: '~',
            c: '==!',
            d: '!=='
        },
        correctAnswer: 'd'
    },
    {
        question: "How is a forEach statement different from a for statement?",
        answers: {
            a: 'Only a for statement uses a callback function.',
            b: 'A for statement is generic, but a forEach statement can be used only with an array.',
            c: 'Only a forEach statement lets you specify your own iterator.',
            d: 'A forEach statement is generic, but a for statement can be used only with an array.'
        },
        correctAnswer: 'c'
    },
    {
        question: 'Which statement is the correct way to create a variable called rate and assign it the value 100?'
        answers: {
            a: 'let rate = 100',
            b: 'let 100 = rate',
            c: '100 = let rate',
            d: 'rate = 100'
        }
    }
];

generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

function showQuestions(questions, quizContainer) {
    // we'll need a place to store the output and the answer choices
    var output = [];
    var answers;

    // for each question...
    for (var i = 0; i < questions.length; i++) {

        // first reset the list of answers
        answers = [];

        // for each available answer...
        for (letter in questions[i].answers) {

            // ...add an html radio button
            answers.push(
                '<label>'
                + '<input type="radio" name="question' + i + '" value="' + letter + '">'
                + letter + ': '
                + questions[i].answers[letter]
                + '</label>'
            );
        }

        // add this question and its answers to the output
        output.push(
            '<div class="question">' + questions[i].question + '</div>'
            + '<div class="answers">' + answers.join('') + '</div>'
        );
    }

    // finally combine our output list into one string of html and put it on the page
    quizContainer.innerHTML = output.join('');
}


function showResults(questions, quizContainer, resultsContainer) {

    // gather answer containers from our quiz
    var answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    var userAnswer = '';
    var numCorrect = 0;

    // for each question...
    for (var i = 0; i < questions.length; i++) {

        // find selected answer
        userAnswer = (answerContainers[i].querySelector('input[name=question' + i + ']:checked') || {}).value;

        // if answer is correct
        if (userAnswer === questions[i].correctAnswer) {
            // add to the number of correct answers
            numCorrect++;

            // color the answers green
            answerContainers[i].style.color = 'lightgreen';
        }
        // if answer is wrong or blank
        else {
            // color the answers red
            answerContainers[i].style.color = 'red';
        }
    }

    // show number of correct answers out of total
    resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
}

// show questions right away
showQuestions(questions, quizContainer);

// on submit, show results
submitButton.onclick = function () {
    showResults(questions, quizContainer, resultsContainer);
}

}