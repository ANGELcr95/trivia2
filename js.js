/* eslint-disable */

//JS VENIDA
let colour = document.getElementById('primerovenida')

let load = () => {
    document.getElementById('primerovenida').classList.add('unovenida');
    document.getElementById('segundovenida').classList.add('dosvenida');
    document.getElementById('spinprincipalvenida').classList.add('spinvenida');
    document.getElementById('spinunovenida').classList.add('spin1venida');
    document.getElementById('spindosvenida').classList.add('spin2venida');
    document.getElementById('spintresvenida').classList.add('spin3venida');
}

load()

function generarNuevoColor(){
	var simbolos, color;
	simbolos = "0123456789ABCDEF";
	color = "#";

	for(var i = 0; i < 6; i++){
		color = color + simbolos[Math.floor(Math.random() * 16)];
	}

	colour.style.background = color;
}

generarNuevoColor()

//MODULOS

//ELEMENTOS HTML
let triviaForm = document.getElementById("trivia");
let questionsContainer = document.getElementById("questionsContent");
let amount = document.getElementById("amount");
let category = document.getElementById("category");
let difficulty = document.getElementById("difficulty");
let type = document.getElementById("type");
let answers = document.getElementsByClassName("answer");
let tempo = document.getElementById('countdown')
let infoTrivia = document.getElementsByClassName("info");

//VARIABLES DE CONTROL
let questions;
let qIndex = 0 ;
let correct_index_answer;
let score = 0;
let initial;

// //FUNCIONES
let getAPIData = e => {
  e.preventDefault();
  let url = `https://opentdb.com/api.php?amount=${amount.value}&category=${category.value}&difficulty=${difficulty.value}&type=${type.value}`;
  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(data => {
      questions = data.results;
      infoTrivia[1].innerText = `${qIndex + 1} / ${amount.value}`
      startGame();
    })
    .catch(err => console.log(err));
};

const startGame = () => {
  questionsContainer.style.display = "flex";
  triviaForm.style.display = "none";

  //Variable para controlar preguntas una por una
  let currentQuestion = questions[qIndex];
  document.getElementById("questionName").innerText = currentQuestion.question;
  infoTrivia[0].innerText = currentQuestion.category  
  infoTrivia[2].innerText = currentQuestion.difficulty

  if (currentQuestion.incorrect_answers.length == 1) {
    document.getElementById("1").innerText = "True";
    document.getElementById("2").innerText = "False";
    document.getElementById("3").style.display = "none";
    document.getElementById("4").style.display = "none";
    if (currentQuestion.correct_answer === "True") correct_index_answer = 1;
    else correct_index_answer = 2;
  } else {
    document.getElementById("1").style.display = "Block";
    document.getElementById("2").style.display = "Block";
    document.getElementById("3").style.display = "Block";
    document.getElementById("4").style.display = "Block";

    correct_index_answer = Math.floor(Math.random() * 4) + 1;
    document.getElementById(correct_index_answer).innerText = currentQuestion.correct_answer;
    
    let j = 0;
    for (let i = 1; i <= 4; i++) {
      if (i === correct_index_answer) continue;
      document.getElementById(i).innerText =
        currentQuestion.incorrect_answers[j];
      j++;
    }
  }

  initial = setTimeout(selectAnswer,7000);
  (function () {
    let n = 5
     let time = setInterval(() => {
      if(n == -1 ){
        clearInterval(time);
        n=5
      }
      if(n > 3 ){
        tempo.style.color = "green"
      }
      if(n < 4 && n >1){
        tempo.style.color = "orange"
      }
      if(n < 2){
        tempo.style.color = "red"
      }
      for (let i = 0; i < answers.length; i++) {
        const element = answers[i];
        element.addEventListener("click", () =>clearInterval(time) );
      }
    tempo.innerHTML = n
    n--
    },1000)
  }) ();
}

const selectAnswer = id => {
  clearTimeout(initial)
  let answerId = id;
  if (answerId == correct_index_answer) {
    score = score + 1;
  }
  if (qIndex < amount.value - 1) {
    qIndex++;
    infoTrivia[1].innerText = `${qIndex + 1} / ${amount.value}`;
    startGame();
  } else if (qIndex == amount.value - 1) {
    showResults(score);
  }
};

const showResults = () => {
  questionsContainer.innerHTML = "";
  let scortext = document.createElement("p");
  scortext.innerText = `Juego terminado, puntuación: ${score}`;
  let buttonReplayGame = document.createElement('button')
  buttonReplayGame.setAttribute("class", "buttonReplayGame" )
  let restartBtn = document.createElement("a");
  restartBtn.setAttribute("href", "/index.html");
  restartBtn.innerHTML = "ReplayGame"
  questionsContainer.appendChild(scortext);
  questionsContainer.appendChild(buttonReplayGame);
  buttonReplayGame.appendChild(restartBtn)
  buttonReplayGame.addEventListener("click", () => {window.location="/index.html"});
};

//FOR QUE RECORRA TODOS LOS BOTONES
for (let i = 0; i < answers.length; i++) {
  const element = answers[i];
  element.addEventListener("click", () => selectAnswer(element.id));
}

//LISTENERS
triviaForm.addEventListener("submit", getAPIData);









