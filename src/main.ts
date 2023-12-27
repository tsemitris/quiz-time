import './scss/style.scss'; // Importera huvud-SCSS-filen
import type { IQuestions } from './questions.ts';
import questions from './questions.ts';
console.log(questions); // need to use questions. remove after implementing logic. 

// FUNKTION FÖR KNAPPEN PÅ FÖRSTASIDAN SOM GÖR ATT QUIZET ÖPPNAS NÄR MAN KLICKAR PÅ DEN

const startQuizBtn: HTMLElement | null = document.querySelector('#startQuizBtn');
const quizSection: HTMLElement | null = document.querySelector('#quizSection');

startQuizBtn?.addEventListener('click', showQuiz);

function showQuiz(): void {
  if (startQuizBtn != null) {
    quizSection?.classList.remove('hidden');
    startQuizBtn.style.display = 'none';
  }
}


// FUNKTION FÖR ATT SVARSKNAPPARNA SKA ÄNDRA FÄRG

const answersContainer: HTMLElement | null = document.querySelector('#answersContainer');
const questionsContainer: HTMLElement | null = document.querySelector('#questionsContainer');

if (answersContainer !== null && questionsContainer !== null) {
  // Hämta första slumpmässiga frågan när sidan laddas
  const currentQuestion = getRandomQuestion();

  // Visa frågan i frågecontainern:
  questionsContainer.textContent = currentQuestion.question;

  // Skapa och lägg till knappar för varje svarsalternativ
  currentQuestion.answers.forEach((answer: string) => {
    const answerBtn = document.createElement('button');
    answerBtn.textContent = answer;
    answerBtn.className = 'answerBtn';
    answerBtn.dataset.correct = currentQuestion.correctAnswer === answer ? 'true' : 'false';
    answerBtn.addEventListener('click', handleAnswer);

    answersContainer.appendChild(answerBtn);
  });

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
      } else {
        btn.classList.add('incorrect');
      }
      console.log(isCorrect);
    });
  }

  // Funktion som hämtar en slumpmässig fråga från arrayen
  function getRandomQuestion(): IQuestions {
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
  }
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