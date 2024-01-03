import './scss/style.scss'; // Importera huvud-SCSS-filen
import { questions, type IQuestion } from './questions.ts';
console.log(questions); // need to use questions. remove after implementing logic. 

// Funktion för knappen på förstasidan som öppnar upp quizet

const startQuizBtn: HTMLElement | null = document.querySelector('#startQuizBtn');
const quizSection: HTMLElement | null = document.querySelector('#quizSection');
const nextBtn: HTMLButtonElement | null = document.querySelector('#nextBtn');

startQuizBtn?.addEventListener('click', showQuiz);

function showQuiz(): void {
  if (startQuizBtn != null) {
    quizSection?.classList.remove('hidden');
    startQuizBtn.style.display = 'none';
    showNextQuestion(); // Visa första frågan när quizet startas
  }
}

/* FUNKTION FÖR ATT SVARSKNAPPARNA SKA ÄNDRA FÄRG 
och nästaknappen aktiveras vid klick på svarsknapp + ny slumpmässig fråga */

// Function that returns an array with 10 random questions
function getRandomQuestions(): IQuestion[] { 
  // New empty array to contain the questions
  const randomQuestions: IQuestion[] = [];
  
  let noOfQuestions = 10;

  while (noOfQuestions > 0) {
    const question = questions[Math.floor(Math.random() * questions.length)];
    // If random question already exits in the array, continue and try a new random question
    if (randomQuestions.includes(question)) {
      continue;
    } else { // else add it to the array
      randomQuestions.push(question);
      noOfQuestions -= 1;
    }
  }
  return randomQuestions;
}

const randomQuestions = getRandomQuestions();

console.log(randomQuestions); 
// Funktion som startar en timer när quizet startas

let seconds: number = 0;
let minutes: number = 0;

startQuizBtn?.addEventListener('click', startTimer);

function startTimer(): void {
  setInterval(updateTimer, 1000);
}

function updateTimer(): void {
  seconds += 1;

  if (seconds === 60) {
    seconds = 0;
    minutes += 1;
  }

  const formattedTime = formattedNumber(minutes) + ':' + formattedNumber(seconds);
  const timerElement: HTMLElement | null = document.querySelector('#timer');

  if (timerElement !== null) {
    timerElement.innerText = formattedTime;
  }
}

function formattedNumber(number: number): string {
  return (number < 10 ? '0' : '') + number;
}

// FUNKTION FÖR ATT SVARSKNAPPARNA SKA ÄNDRA FÄRG


const answersContainer: HTMLElement | null = document.querySelector('#answersContainer');
const questionsContainer: HTMLElement | null = document.querySelector('#questionsContainer');

nextBtn?.addEventListener('click', showNextQuestion);

// Funktion för att visa nästa fråga:
function showNextQuestion(): void {
  // Rensa innehållet i svarscontainern för att förbereda för nya svarsknappar:
  if (answersContainer !== null) {
    answersContainer.innerHTML = '';
  }

  // Hämta ny slumpmässig fråga:
  const currentQuestion = getRandomQuestions();

  if (answersContainer !== null && questionsContainer !== null) {
    // Hämta första slumpmässiga frågan när sidan laddas
    // Variable to know which question we are on - useful for next button and navigation
    const currentQuestionIndex = 0;
  
    // Get the current question by taking the question with the current question index
    // from the array of random questions
    const currentQuestion = randomQuestions[currentQuestionIndex];
  
  
    // Uppdatera frågecontainern med den nya frågan:
    if (questionsContainer !== null) {
      questionsContainer.textContent = currentQuestion.question;
    }
  
    // Inaktivera nästaknappen innan svar har tryckts på 
    nextBtn?.setAttribute('disabled', 'true');
  
    // Skapa och lägg till svarsknappar för varje svarsalternativ:
    currentQuestion.answers.forEach((answer: string) => {
      const answerBtn = document.createElement('button');
      answerBtn.textContent = answer;
      answerBtn.className = 'answerBtn';
      answerBtn.dataset.correct = currentQuestion.correctAnswer === answer ? 'true' : 'false';
      answerBtn.addEventListener('click', handleAnswer);
  
      // Lägg till svarsknappen i svarscontainern:
      if (answersContainer !== null) {
        answersContainer.appendChild(answerBtn);
      }
    });
  }
}

// Funktion som hanterar när användaren klickar på ett svartsalternativ:
function handleAnswer(event: Event): void {
  const clickedBtn = event.currentTarget as HTMLButtonElement;
  const isCorrect = clickedBtn.dataset.correct === 'true';

  // Markera knapparna baserat på rätt eller fel svar
  markAnswerButtons(isCorrect);
}

// Funktion som ändrar färgen på svarsknapparna baserat på rätt eller fel svar:
function markAnswerButtons(isCorrect: boolean): void {
  const answerButtons = document.querySelectorAll('.answerBtn');
  answerButtons.forEach((btn) => {
    btn.classList.remove('correct', 'incorrect');
    const correctAttribute = btn.getAttribute('data-correct');
    if (correctAttribute === 'true') {
      btn.classList.add('correct');
      nextBtn?.removeAttribute('disabled');
    } else {
      btn.classList.add('incorrect');
      nextBtn?.removeAttribute('disabled');
    }
    console.log(isCorrect);
  });
}




/**
 import typescriptLogo from './assets/images/typescript.svg'; // Exempel på hur ni importerar bilder
import { sortArrayByText } from './helpers'; // Exempel på hur ni importerar en funktion från en annan fil

/**
 * Här definierar vi en mall för hur vi vill att vår array ska se ut.
 * Ett så kallat "interface".
 * Den är för att garantera att ALLA objekt i vår array har samtliga egenskaper.
 * Prova t.ex. att lägga till en egenskap i interfacet, och notera hur arrayen nedanför
 * får rödmarkeringar där denna egenskap saknas.
 
interface IExampleArray {
  name: string;
  age: number;
}

// Här skriver vi att vår array med namnet myExampleArray ska följa reglerna (interfacet)
// i IExampleArray och att det är en array genom att vi sätter [] efter
const myExampleArray: IExampleArray[] = [
  {
    name: 'Hans',
    age: 25,
  },
  {
    name: 'Greta',
    age: 30,
  },
  {
    name: 'Häxan',
    age: 87,
  },
];

// Skriv ut den sorterade arrayen i konsolen, använd en importerad funktion
console.table(sortArrayByText(myExampleArray, 'name'));

// Använd samma funktion för att sortera på en annan egenskap
console.table(sortArrayByText(myExampleArray, 'age'));

// Hämta ett HTML-element från index.html
const container: HTMLDivElement | null = document.querySelector('#app');

if (container !== null) { // Om HTML-elementet finns
  container.innerHTML = `
    <div>
      <h1>Hello FED23D!</h1>
      <img src="${typescriptLogo}" loading="lazy" width="32" height="32"
        alt="Blå bakgrund, vita bokstäver ovanpå med texten TS">
    </div>
  `;
} */
