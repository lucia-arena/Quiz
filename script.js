let startButton = document.getElementById('start-btn');
let nextButton = document.getElementById('next-btn');
let questionContainerElement = document.getElementById('question-container');
let questionElement = document.getElementById('question');
let answerButtonsElement = document.getElementById('answer-buttons');
let score = 0;
let shuffledQuestions; 
let currentQuestionIndex;

/* escucha hasta que el botón empezar es clickeado, y llama a la función startGame */
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

/* funcion para mostrar la primera pregunta */
function startGame() {
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - .5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
}

/* selecciona la siguiente pregunta */
function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

/* muestra el contenido de la pregunta */
function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

/* selecciona la respuesta */
function selectAnswer(e) {
  let selectedButton = e.target;
  let correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  });
  
  /* ventana modal con los resultados finales */ 
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  }

  else {
    startButton.innerText = 'Reiniciar';
    
    if(score < 6){
      location.href = '#popup';
      document.getElementById('score').innerHTML = 'Respuestas correctas: 0';
    }

    if(score == 6){
      location.href = '#popup';
      document.getElementById('score').innerHTML = 'Respuestas correctas: 1';

    }
    if(score == 7){
      location.href = '#popup';
      document.getElementById('popupImage').src = 'image/meh.gif';
      document.getElementById('score').innerHTML = 'Respuestas correctas: 2';
    }
    if(score == 8){
      location.href = '#popup';
      document.getElementById('popupImage').src = 'image/meh.gif';
      document.getElementById('score').innerHTML = 'Respuestas correctas: 3';
    }
    if(score == 9){
      location.href = '#popup';
      document.getElementById('popupImage').src = 'image/good.gif';
      document.getElementById('score').innerHTML = 'Respuestas correctas: 4';
    }
    if(score == 10){
      location.href = '#popup';
      document.getElementById("popupImage").src = 'image/win.gif';
      document.getElementById('score').innerHTML = 'Respuestas correctas: 5';
    }
    startButton.classList.remove('hide');
    score = 0;
  }
}

/* Suma las respuestas correctas para el resultado final */
function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
    score++;
  } 
  else {
    element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

/* base de datos de preguntas */
const questions = [
  {
    question: '¿Quién escribió "La soledad de los números primos?"',
    answers: [
      { text: 'Megan Maxwell', correct: false },
      { text: 'Paolo Giordano', correct: true },
      { text: 'George Orwell', correct: false },
      { text: 'René Descartes', correct: false }
    ]
  },
  {
    question: 'Atticus Finch es un famoso personaje de:',
    answers: [
      { text: 'Matar un ruiseñor', correct: true },
      { text: 'Las uvas de la ira', correct: false },
      { text: 'El guardián entre el centeno', correct: false },
      { text: 'La conjura de los necios', correct: false }
    ]
  },
  {
    question: '¿Quién pronuncia las siguientes palabras?: "que toda la vida es sueño, y los sueños, sueños son."',
    answers: [
      { text: 'Rey Basilio', correct: false },
      { text: 'Virgilio', correct: false },
      { text: 'Mefistófeles', correct: false },
      { text: 'Segismundo', correct: true }
    ]
  },
  {
    question: '"El banquete", es un díalogo ¿de qué filosofo?',
    answers: [
      { text: 'Locke', correct: false },
      { text: 'Aristóteles', correct: false },
      { text: 'Kant', correct: false },
      { text: 'Platón', correct: true }
    ]
  },
  {
    question: '"Los árboles mueren de pie" fue escrita por el mismo autor que escribió:',
    answers: [
      { text: 'La casa de bernarda alba', correct: false },
      { text: 'Prohibido suicidarse en primavera', correct: true },
      { text: 'La celestina', correct: false },
      { text: 'Bodas de sangre', correct: false }
    ]
  } 
]
