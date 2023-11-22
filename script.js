const questions = [
    {
      question: "Which is the largest animal in the world?",
      answers: [
        { text: "Shark", correct: false },
        { text: "Blue whale", correct: true },
        { text: "Elephant", correct: false },
        { text: "Giraffe", correct: false },
      ],
    },
    {
      question: "Which is the smallest country in the world?",
      answers: [
        { text: "Vatican City", correct: true },
        { text: "Bhutan", correct: false },
        { text: "Nepal", correct: false },
        { text: "Sri Lanka", correct: false },
      ],
    },
    {
      question: "Which is the largest desert in the world?",
      answers: [
        { text: "Kalahari", correct: false },
        { text: "Gobi", correct: true },
        { text: "Sahara", correct: false },
        { text: "Atacama", correct: false },
      ],
    },
    {
      question: "Which is the smallest continent in the world?",
      answers: [
        { text: "Asia", correct: false },
        { text: "Australia", correct: true },
        { text: "Arctic", correct: false },
        { text: "Africa", correct: false },
      ],
    },
  ];
  
  const questionElement = document.getElementById("question");
  const ansButton = document.getElementById("answer-button");
  const nextButton = document.getElementById("next-btn");
  
  let currentQue = 0;
  let score = 0;
  
  function startQuiz() {
    currentQue = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
  }
  
  function showQuestion() {
    // reset the previous answers
    resetState();
    let currentQuestion = questions[currentQue];
    let questionNO = currentQue + 1;
    questionElement.innerHTML = questionNO + ". " + currentQuestion.question;
  
    currentQuestion.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.innerHTML = answer.text;
      button.classList.add("btn");
      ansButton.appendChild(button);
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
    });
  }
  
  function resetState() {
    nextButton.style.display = "none";
    while (ansButton.firstChild) {
      ansButton.removeChild(ansButton.firstChild);
    }
  }
  
  function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
      selectedBtn.classList.add("correct");
      score++;
    } else {
      selectedBtn.classList.add("incorrect");
    }
    Array.from(ansButton.children).forEach((button) => {
      if (button.dataset.correct === "true") {
        button.classList.add("correct");
      }
      button.disabled = true;
    });
    nextButton.style.display = "block";
  }
  
  function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
  }
  
  function handleNextButton() {
    currentQue++;
    if (currentQue < questions.length) {
      showQuestion();
    } else {
      showScore();
    }
  }
  
  nextButton.addEventListener("click", () => {
    if (currentQue < questions.length) {
      handleNextButton();
    } else {
      startQuiz();
    }
  });
  
  startQuiz();
  