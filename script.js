const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const questionContainerElem = document.getElementById('question-container');

const questionElem = document.getElementById('question');
const answerBtnsElem = document.getElementById('answer-btns');

let shuffledQuestions, currentQuestionIndex;

startBtn.addEventListener('click', startGame);
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;

    setNextQuestion();
});

function startGame() {
    startBtn.classList.add('hide');

    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;

    questionContainerElem.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElem.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        
        button.addEventListener('click', selectAnswer);
        answerBtnsElem.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);

    nextBtn.classList.add('hide');

    while (answerBtnsElem.firstChild) {
        answerBtnsElem.removeChild(answerBtnsElem.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;

    const correct = selectedBtn.dataset.correct;

    setStatusClass(document.body, correct);
    Array.from(answerBtnsElem.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextBtn.classList.remove('hide');
    }
    else {
        startBtn.innerText = 'Restart';
        startBtn.classList.remove('hide');
    }

}

function setStatusClass(elem, correct) {
    clearStatusClass(elem);

    if (correct) {
        elem.classList.add('correct');
    }
    else {
        elem.classList.add('wrong');
    }
}

function clearStatusClass(elem) {
    elem.classList.remove('correct');
    elem.classList.remove('wrong');
}

const questions = [
    {
        question: 'What is the best?',
        answers: [
            { text: 'Svelte', correct: true },
            { text: 'Vue', correct: false },
            { text: 'React', correct: false },
            { text: 'Angular', correct: false }
        ]
    },
    {
        question: 'Is web development fun?',
        answers: [
            { text: 'Kinda', correct: false },
            { text: 'YES!!!', correct: true },
            { text: 'Um no', correct: false },
            { text: 'IDK', correct: false }
        ]
    },
    {
        question: 'What YT channel is the best?',
        answers: [
            { text: 'The Coding Train', correct: true },
            { text: 'Traversy Media', correct: true },
            { text: 'WebDeb Simplified', correct: true },
            { text: 'The Net Ninja', correct: true }
        ]
    },
    {
        question: 'Svelte.js is a...',
        answers: [
            { text: 'Framework', correct: false },
            { text: 'Compiler', correct: true },
            { text: 'Language', correct: false },
            { text: 'Text Editor', correct: false }
        ]
    },
    {
        question: 'NPM stands for...',
        answers: [
            { text: 'Nodes Per Minute', correct: true },
            { text: 'Not Package Manager', correct: false },
            { text: 'Node Package Manager', correct: false },
            { text: 'No Programming Mode', correct: false }
        ]
    }
];
