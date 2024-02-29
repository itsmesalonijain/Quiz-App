const questions=[
    {
        question:"Who is father of Computer ?",
        answers:[
            {text:"Charles Babbage", correct: true},
            {text: "Thomas Edison", correct: false},
            {text: "Albert Einstein", correct: false},
            {text: "Issac Newton", correct: false}
        ]
    },
    {
        question:"www stands for?",
        answers:[
            {text:"World Worm Web", correct: false},
            {text: "World Wide Web", correct: true},
            {text: "World Word Web", correct: false},
            {text: "None of the above", correct: false}
        ]
    },
    {
        question:"What connects one city to other ?",
        answers:[
            {text:"LAN", correct: false},
            {text: "WAN", correct: true},
            {text: "MAN", correct: false},
            {text:"PAN", correct: false}
        ]
    },
    {
        question:"What is used to view web pages?",
        answers:[
            {text:"Web Browser", correct: true},
            {text: "Word", correct: false},
            {text: "Excel", correct: false},
            {text: "All of the above", correct: false}
        ]
    }
];

const questionElement = document.getElementById("Q1");
const answerButtons = document.getElementById("answer-buttons");
const nextButton= document.getElementById("next");

let currentQuestionIndex=0;
let score =0;
function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion()
{
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". "+currentQuestion.question;
    currentQuestion.answers.forEach(answer=>{
        const button = document.createElement("button");
        button.innerHTML= answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct)
        {
            button.dataset.correct=answer.correct;

        }
        button.addEventListener("click", selectAnswer);

    });
}

function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button=> {
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}
function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex<questions.length)
    {
        handleNextButton();
    }else{
        startQuiz();
    }
}
)

startQuiz();