import './scss/style.scss'; // Importera huvud-SCSS-filen
import questions from './questions.ts';
console.log(questions); // need to use questions. remove after implementing logic. 

// Funktion för knappen på förstasidan som öppnar upp quizet

const startQuizBtn: HTMLElement | null = document.querySelector('#startQuizBtn');
const quizSection: HTMLElement | null = document.querySelector('#quizSection');

startQuizBtn?.addEventListener('click', showQuiz);

function showQuiz(): void {
  if (startQuizBtn != null) {
    quizSection?.classList.remove('hidden');
    startQuizBtn.style.display = 'none';
  }
  
}

// Funktion som startar en timer när quizet startas

let timerInterval: number | null;
let seconds: number = 0;
let minutes: number = 0;

startQuizBtn?.addEventListener('click', startTimer);

function startTimer(): void {
  timerInterval = setInterval(updateTimer, 1000);
  console.log(timerInterval);
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