import './scss/style.scss';
import { questions, type IQuestion } from './questions.ts';

// - - - - - - - - - - - - - - - - - VARIABLES - - - - - - - - - - - - - - - - -
// Home page
const homePage: HTMLElement | null = document.querySelector('#homePage');
const startQuizBtn: HTMLElement | null = document.querySelector('#startQuizBtn');

// Quiz page
const quizPage: HTMLElement | null = document.querySelector('#quizPage');
const questionsContainer: HTMLElement | null = document.querySelector('#questionsContainer');
const answersContainer: HTMLElement | null = document.querySelector('#answersContainer');
const nextBtn: HTMLButtonElement | null = document.querySelector('#nextBtn');

// Results popup
const counterDisplay: HTMLElement | null = document.querySelector('.counter-display');

/** - - - - - - - - - CURRENT QUESTION COUNTER OUT OF TOTAL - - - - - - - - - - 
 * Update question counter display
*/
function updateCounterDisplay(): void {
  if (counterDisplay !== null) {
    counterDisplay.innerHTML = currentQuestionIndex.toString() + '/' + totalQuestions; 
  }
}

/** - - - - - - - - - - - - - - UPDATE SCORE DISPLAY - - - - - - - - - - - - - -
 * Update score display
*/
let score = 0;

function updateScoreDisplay(): void {
  const scoreDisplay: HTMLElement | null = document.querySelector('#scoreDisplay');
  if (scoreDisplay !== null) {
    scoreDisplay.textContent = `Score: ${score}`; // Update the text content with the current score
  }
}

// - - - - - - - - - - - - - - - START QUIZ BUTTON - - - - - - - - - - - - - -
startQuizBtn?.addEventListener('click', showQuiz);

function showQuiz(): void {
  if (startQuizBtn != null) {
    homePage?.classList.toggle('hidden');
    quizPage?.classList.toggle('hidden');
    showNextQuestion(); // Show the first question when the quiz starts
  }
}

/** - - - - - - - - - - - - - - - FETCH QUESTIONS - - - - - - - - - - - - - -
 * @return an array with 10 random questions
*/
function getRandomQuestions(): IQuestion[] { 
  // New empty array to contain the questions
  const randomQuestions: IQuestion[] = [];

  let noOfQuestions = 10;

  while (noOfQuestions > 0) {
    const question = questions[Math.floor(Math.random() * questions.length)];
    // If random question already exists in the array, continue and try a new random question
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



// - - - - - - - - - - - - - - - - QUIZ TIMER - - - - - - - - - - - - - - - -
let timerInterval: number;
let seconds: number = 0;
let minutes: number = 0;

startQuizBtn?.addEventListener('click', startTimer);

function startTimer(): void {
  timerInterval = setInterval(updateTimer, 1000);
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

/** - - - - - - - - - - - - - NEXT QUESTION BUTTON - - - - - - - - - - - - -
 * Show the next question
*/
nextBtn?.addEventListener('click', showNextQuestion);

let currentQuestionIndex = 0;
const totalQuestions = 10;

function showNextQuestion(): void {
  // Clear the content of the answer container to prepare for a new answer buttons
  if (answersContainer !== null) {
    answersContainer.innerHTML = '';
  }

  if (answersContainer !== null && questionsContainer !== null) {
    // Variable to know which question we are on - useful for next button and navigation
  
    // Get the current question by taking the question with the current question index
    // from the array of random questions
    const currentQuestion = randomQuestions[currentQuestionIndex];
  
  
    // Update the question container with the new question
    if (questionsContainer !== null) {
      questionsContainer.textContent = currentQuestion.question;
    }
  
    // Disable the next button until answer is clicked
    nextBtn?.setAttribute('disabled', 'true');
    // Show next button before all questions been answered
    nextBtn?.classList.remove('hidden');
  
    // Create and add answer buttons for each answer option
    currentQuestion.answers.forEach((answer: string) => {
      const answerBtn = document.createElement('button');
      answerBtn.textContent = answer;
      answerBtn.className = 'answerBtn';
      const correctAnswerString = currentQuestion.answers[currentQuestion.correctAnswer];
      answerBtn.dataset.correct = correctAnswerString === answer ? 'true' : 'false';
      answerBtn.addEventListener('click', handleAnswer);
  
      // Add the answer button to the answer container
      if (answersContainer !== null) {
        answersContainer.appendChild(answerBtn);
      }
    });
    currentQuestionIndex += 1;

    // Check if all questions are answered
    if (currentQuestionIndex === totalQuestions) {
      // Hide the next button when all questions are answered
      nextBtn?.classList.add('hidden');
    }

    updateCounterDisplay();
  
  }
}

/** - - - - - - - - - - - - - ON LAST QUESTION - - - - - - - - - - - - - -
 * The timer will stop when the player have answered the last question
 * and also save the time in a variable called 'finalTime'
*/
function stopTimer(): void {
  clearInterval(timerInterval);
}

/** - - - - - - - - - - - - - - HANDLE ANSWER - - - - - - - - - - - - - - -
 * Function that handles when the user clicks on an answer option
*/
function handleAnswer(event: Event): void {
  const clickedBtn = event.currentTarget as HTMLButtonElement;
  const isCorrect = clickedBtn.dataset.correct === 'true';

  // Updates score with 5 points if answer is correct
  if (isCorrect) {
    score += 5;
    updateScoreDisplay();
  }
  // Mark the buttons based on whether the answer is correct or incorrect
  markAnswerButtons(isCorrect);

  // If the player has answered the last question, the stopTimer function will be activated
  if (currentQuestionIndex === randomQuestions.length) {
    stopTimer();
    displayFinalResults();
  }
}

/** - - - - - - - - - - - - - - MARK ANSWER BUTTONS - - - - - - - - - - - -
 * Changes the color of the answer buttons based on whether 
 * the answer is correct or incorrect
*/
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

/** - - - - - - - - - - - - - - FINAL RESULTS - - - - - - - - - - - - - - -
 * Display final results
*/
function displayFinalResults(): void {
  const finalScoreElement: HTMLElement | null = document.querySelector('#finalScore');
  const finalTimeElement: HTMLElement | null = document.querySelector('#finalTime');
  const resultsContainer: HTMLElement | null = document.querySelector('#resultsContainer');
  const scoreContainer: HTMLElement | null = document.querySelector('#scoreDisplay');

  if (finalScoreElement !== null) {
    finalScoreElement.textContent = `Final Score: ${score}`;
  }

  if (finalTimeElement !== null) {
    const formattedTime = formattedNumber(minutes) + ':' + formattedNumber(seconds);
    finalTimeElement.textContent = `Time Taken: ${formattedTime}`;
  }

  if (resultsContainer !== null) {
    resultsContainer.classList.remove('hidden');
  }

  if (scoreContainer !== null) {
    scoreContainer.classList.add('hidden');
  }
}
