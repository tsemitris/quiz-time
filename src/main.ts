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
const scoreContainer: HTMLElement | null = document.querySelector('#scoreDisplay');

// Results popup
const counterDisplay: HTMLElement | null = document.querySelector('.counter-display');
const resultsContainer: HTMLElement | null = document.querySelector('#resultsContainer');
const restartQuizBtn: HTMLElement | null = document.querySelector('#restartQuizBtn');

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
let hours: number = 0;

startQuizBtn?.addEventListener('click', startTimer);

function startTimer(): void {
  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer(): void {
  seconds += 1;

  if (seconds === 60) {
    seconds = 0;
    minutes += 1;

    if (minutes === 60) {
      minutes = 0;
      hours += 1;
    }
  }


  const formattedTime = hours > 0 ?
    formattedNumber(hours) + ':' + formattedNumber(minutes) + ':' + formattedNumber(seconds) :
    formattedNumber(minutes) + ':' + formattedNumber(seconds);
    // If the condition 'hours > 0' is true the numbers for hours will show, otherwise not

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
// Flag to track whether the user has answered the current question
let hasAnswered = false;

nextBtn?.addEventListener('click', showNextQuestion);

let currentQuestionIndex = 0;
const totalQuestions = 10;
let currentQuestion = randomQuestions[currentQuestionIndex];

function showNextQuestion(): void {
  // Clear the content of the answer container to prepare for a new answer buttons
  if (answersContainer !== null) {
    answersContainer.innerHTML = '';
  }

  if (answersContainer !== null && questionsContainer !== null) {
    // Variable to know which question we are on - useful for next button and navigation
  
    // Get the current question by taking the question with the current question index
    // from the array of random questions
    currentQuestion = randomQuestions[currentQuestionIndex];
  
  
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

    // Enable answer buttons for the next question
    if (hasAnswered) {
      enableAnswerButtons();
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
  const correctAnswerString = currentQuestion.answers[currentQuestion.correctAnswerIndex];
  const clickedAnswer =  clickedBtn.textContent;

  const isCorrect = correctAnswerString === clickedAnswer;

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

  // Disable answer buttons after the player has answered
  disableAnswerButtons();

  // Set the flag to indicate that the user has answered the current question
  hasAnswered = true;
}


/* - - - - - - - - - - - - DISABLE ANSWER BUTTONS - - - - - - - - - - - - 
* Disable answer buttons when the player has answered
* and enable when a question is shown, before the player answers
*/
// Function to disable answer buttons
function disableAnswerButtons(): void {
  const answerButtons = document.querySelectorAll('.answerBtn');
  answerButtons.forEach((btn) => {
    btn.setAttribute('disabled', 'true');
  });
}

// Function to enable answer buttons
function enableAnswerButtons(): void {
  const answerButtons = document.querySelectorAll('.answerBtn');
  answerButtons.forEach((btn) => {
    btn.removeAttribute('disabled');
  });

  // Reset the hasAnswered flag
  hasAnswered = false;
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

/** - - - - - - - - - - - - - - RESTART QUIZ - - - - - - - - - - - - - - -
 * Resets everything and restarts the quiz again with new random questions when clicking the 
 * restart quiz-button
*/

restartQuizBtn?.addEventListener('click', restartQuiz);

function restartQuiz(): void {
  score = 0;
  seconds = 0;
  minutes = 0;
  hours = 0;
  currentQuestionIndex = 0;
  // Reset score, timer and current question

  if (resultsContainer !== null) {
    resultsContainer.classList.add('hidden');
  }
  // Hide result container when restarting the quiz

  if (scoreContainer !== null) {
    scoreContainer.classList.remove('hidden');
  }
  // Show score counter when quiz starts again

  updateTimer();
  updateScoreDisplay();
  updateCounterDisplay();
  showNextQuestion(); 
  startTimer();
  // Activate the quiz again
}
