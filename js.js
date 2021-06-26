/* eslint-disable */
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
    // console.log("Respuesta correcta !");
  } else {
    // console.log("Respuesta incorrecta 💔");
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
  restartBtn.setAttribute("href", "assets.html");
  restartBtn.innerHTML = "ReplayGame"
  questionsContainer.appendChild(scortext);
  questionsContainer.appendChild(buttonReplayGame);
  buttonReplayGame.appendChild(restartBtn)
  buttonReplayGame.addEventListener("click", () => {window.location="/assets.html"});
};

//FOR QUE RECORRA TODOS LOS BOTONES
for (let i = 0; i < answers.length; i++) {
  const element = answers[i];
  element.addEventListener("click", () => selectAnswer(element.id));
}

//LISTENERS
triviaForm.addEventListener("submit", getAPIData);


















// //crea promesa
// const promise = new Promise((resolve, reject) => {
//     const randomNumber = Math.floor(Math.random() * 10);
//     setTimeout(() => {


//         // if (randomNumber > 5) {
//         //     resolve(randomNumber);
//         // } else {
//         //     reject(new Error(`El numero generado (${randomNumber}) es menor a 5`))
//         // }
//     },3000);
// });
// promise.then(number => console.log(number)).catch(error => console.log(error));
// // console.log(promise)

// //ASYNC/ AWAY
// const fetchDataApi = async () => { // que la funcion se asincrona
//     try {
//         const dittoResponse = await fetch(
//             'https://pokeapi.co/api/v2/pokemon/ditto'
//         )
//         const dittoData = await dittoResponse.json();
//         const dittoSpeciesUrl = await dittoData.species.url;
//         const dittoSpeciesUrlObjects = await fetch(
//             dittoSpeciesUrl
//         )
//         const dittoSpeciesUrlObjectsJSON = await dittoSpeciesUrlObjects.json()
//         // console.log(dittoSpeciesUrlObjectsJSON)
//     } catch (error) {
//         // console.log(error)
//     }
// }
// fetchDataApi()
// import{example,asyncrono} from "./module.js";

// // let variableAsync = await asyncrono()
// console.log(variableAsync)
// console.log(example('paso a mayusculas'))
