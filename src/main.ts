import './scss/style.scss';
import { questions, type IQuestion } from './questions.ts';

// - - - - - - - - - - - - - - - - - VARIABLES - - - - - - - - - - - - - - - - -
// Home page
const homePage: HTMLElement | null = document.querySelector('#homePage');
const startQuizBtn: HTMLElement | null = document.querySelector('#startQuizBtn');

// Quiz page
const totalQuestions: number = 10;
const quizPage: HTMLElement | null = document.querySelector('#quizPage');
const questionsContainer: HTMLElement | null = document.querySelector('#questionsContainer');
const nextBtn: HTMLButtonElement | null = document.querySelector('#nextBtn');
const infoContainer: HTMLElement | null = document.querySelector('#infoContainer');

// Results popup
const counterDisplay: HTMLElement | null = document.querySelector('.counter-display');
const resultsPopup: HTMLElement | null = document.querySelector('#resultsPopup');
const resultsContainer: HTMLElement | null = document.querySelector('#resultsContainer');
const resultIcon: HTMLImageElement | null = document.querySelector('#resultIcon');
const restartQuizBtn: HTMLElement | null = document.querySelector('#restartQuizBtn');
let usersCorrectAnswers: number = 0;

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
    // Update the text content with the current score
    scoreDisplay.innerHTML = `
      <span class="score-icon"></span> ${score} points
    `; 
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

  let noOfQuestions = totalQuestions;

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

let randomQuestions = getRandomQuestions();


// - - - - - - - - - - - - - - - - QUIZ TIMER - - - - - - - - - - - - - - - -
let timerInterval: number;
let hours: number = 0;
let minutes: number = 0;
let seconds: number = 0;

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
    timerElement.innerHTML = `<span class="timer-icon"></span> ${formattedTime}`;
  }
}

function formattedNumber(number: number): string {
  return (number < 10 ? '0' : '') + number;
}

/** - - - - - - - - - - - - - NEXT QUESTION BUTTON - - - - - - - - - - - - -
 * Show the next question
*/

const answersContainer: HTMLElement | null = document.querySelector('#answersContainer');

let currentQuestionIndex = 0;
let currentQuestion = randomQuestions[currentQuestionIndex];

// Flag to track whether the user has answered the current question
let hasAnswered = false;

nextBtn?.addEventListener('click', showNextQuestion);

function showNextQuestion(): void {
  if (answersContainer === null || questionsContainer === null) {
    return;
  }

  // Get the current question by taking the question with the current question index
  // from the array of random questions
  currentQuestion = randomQuestions[currentQuestionIndex];
  questionsContainer.textContent = currentQuestion.question;

  const containerButtons = answersContainer.querySelectorAll('button');
  
  for (let i: number = 0; i < containerButtons.length; i++) {
    // Remove the class from the buttons in the previous question
    containerButtons[i].classList.remove('correct-answer', 'incorrect-answer');

    const currentAnswer: string = currentQuestion.answers[i];
    const answerText = containerButtons[i].querySelector('.answer-text');
    
    if (answerText !== null) {
      // Add the new answer in the button   
      answerText.textContent = currentAnswer;
      // ally Removes the correct / incorrect aria label who is leftover from the previous button
      containerButtons[i].removeAttribute('aria-label');
    }

    containerButtons[i].addEventListener('click', handleAnswer);
  }


  // Disable the next button until answer is clicked
  nextBtn?.setAttribute('disabled', 'true');
  // Show next button before all questions been answered
  nextBtn?.classList.remove('hidden');

  // a11y
  if (currentQuestionIndex !== 0) {
    // Next button
    nextBtn?.removeAttribute('aria-label');
    nextBtn?.setAttribute('aria-label', `${currentQuestion.question} Tab to listen the answers`);
    
    // Question
    questionsContainer?.removeAttribute('tabindex');
  }

  currentQuestionIndex += 1;


  // Check if all questions are answered
  if (currentQuestionIndex === totalQuestions) {
    // Hide the next button when all questions are answered
    nextBtn?.classList.add('hidden');
  }

  if (hasAnswered) {
    enableAnswerButtons();
  }

  updateCounterDisplay();
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
  const clickedAnswer =  clickedBtn.querySelector('.answer-text')?.textContent;

  const isCorrect = correctAnswerString === clickedAnswer;
  
  // Updates score with 5 points if answer is correct
  if (isCorrect) {
    // a11y for correct answer
    clickedBtn?.setAttribute('aria-label', 'Correct answer, five points has added to your score');
    score += 5;
    usersCorrectAnswers += 1;
    updateScoreDisplay();
  } else {
    // a11y for incorrect answer
    clickedBtn?.setAttribute('aria-label', `Incorrect answer, the correct answer was ${correctAnswerString}`);
  }
  // Mark the buttons based on whether the answer is correct or incorrect
  markAnswerButtons(correctAnswerString, clickedBtn, isCorrect);

  // If the player has answered the last question, the stopTimer function will be activated
  if (currentQuestionIndex === randomQuestions.length) {
    stopTimer();
    displayFinalResults();
  }

  // Disable answer buttons after the player has answered
  disableAnswerButtons();

  // Set the flag to indicate that the user has answered the current question
  hasAnswered = true;

  // a11y Remove the tabindex from question
  if (currentQuestionIndex === totalQuestions) {
    questionsContainer?.removeAttribute('tabindex');
  }

  // a11y for next button
  nextBtn?.removeAttribute('aria-label');
}

/* - - - - - - - - - - - - DISABLE ANSWER BUTTONS - - - - - - - - - - - - 
* Disable answer buttons when the player has answered
* and enable when a question is shown, before the player answers
*/
// Function to disable answer buttons
function disableAnswerButtons(): void {
  if (answersContainer !== null) {
    const containerButtons = answersContainer.querySelectorAll('button');
    containerButtons.forEach((btn) => {
      btn.setAttribute('disabled', 'true');
    });
  }
}

// Function to enable answer buttons
function enableAnswerButtons(): void {
  if (answersContainer !== null) {
    const containerButtons = answersContainer.querySelectorAll('button');
    containerButtons.forEach((btn) => {
      btn.removeAttribute('disabled');
    });

    // Reset the hasAnswered flag
    hasAnswered = false;
  }
}

/** - - - - - - - - - - - - - - MARK ANSWER BUTTONS - - - - - - - - - - - -
 * Changes the color of the answer buttons based on whether 
 * the answer is correct or incorrect
*/
function markAnswerButtons(correctAnswerString: string, clickedBtn: HTMLButtonElement, isCorrect: boolean): void {
  if (answersContainer === null ) {

    return;
  }
  const containerButtons = answersContainer.querySelectorAll('button');

  if (isCorrect) {
    clickedBtn.classList.add('correct-answer');
  } else {
    clickedBtn.classList.add('incorrect-answer');

    containerButtons.forEach((btn) => {
      const currentButtonContent: string | null | undefined = btn.querySelector('.answer-text')?.textContent;

      if (currentButtonContent === correctAnswerString) {
        btn.classList.add('correct-answer');
      }
    });
  }
  nextBtn?.removeAttribute('disabled');
}

/** - - - - - - - - - - - - - - FINAL RESULTS - - - - - - - - - - - - - - -
 * Display final results
*/
function displayFinalResults(): void {
  const totalScore: HTMLElement | null = document.querySelector('#totalScore');
  const totalPoints: HTMLElement | null = document.querySelector('#totalPoints');
  const totalSectionTime: HTMLElement | null = document.querySelector('#totalSectionTime');

  // This variables is for change the image in the result popup
  const currentSrc = resultIcon?.currentSrc;
  const baseURL = currentSrc?.substring(0, currentSrc.lastIndexOf('/') + 1);

  restartQuizBtn?.removeAttribute('aria-label');
  restartQuizBtn?.setAttribute(
    'aria-label',
    `Congratulations, you have complete the quiz! You answered ${usersCorrectAnswers} out of ${totalQuestions},
    with a score of ${score}. It took you ${formattedNumber(minutes)} minutes and ${formattedNumber(seconds)} seconds to
    complete the whole quiz. Would you like to play a new quiz? You have selected Play again button.
  `);
  
  
  if (usersCorrectAnswers === totalQuestions) {
    if (resultIcon !== null) {
      resultIcon.src = `${baseURL}fire.svg`;
      resultIcon.alt = 'black colored fire icon';
    }
  } else if (usersCorrectAnswers >= (totalQuestions / 2) && usersCorrectAnswers < totalQuestions) {
    if (resultIcon !== null) {
      resultIcon.src = `${baseURL}star.svg`;
      resultIcon.alt = 'two black colored stars icon';
    }
  } else if (usersCorrectAnswers > 0 && usersCorrectAnswers <= (totalQuestions / 2)) {
    if (resultIcon !== null) {
      resultIcon.src = `${baseURL}happy_face.svg`;
      resultIcon.alt = 'black colored happy face icon';
    }
  } else if (usersCorrectAnswers === 0) {
    if (resultIcon !== null) {
      resultIcon.src = `${baseURL}sad_face.svg`;
      resultIcon.alt = 'black colored sad face icon';
    }
  }

  // Results popup
  if (resultsPopup !== null && resultsContainer !== null) {
    resultsPopup.classList.remove('hidden');

    resultsPopup.classList.add('result-in-animation');
    setTimeout(() => {
      resultsContainer.classList.add('result-in-animation');
    }, .5 * 1000);
  }

  if (totalScore !== null) {
    totalScore.textContent = `You scored: ${usersCorrectAnswers} / ${totalQuestions}`;
  }

  if (totalPoints !== null) {
    totalPoints.textContent = `Total points: ${score}`;
  }
  
  // Print out the total section time
  if (totalSectionTime !== null) {
    if (hours >= 1) {
      totalSectionTime.textContent = `
        It took you ${formattedNumber(hours)}:${formattedNumber(minutes)}:${formattedNumber(seconds)}
      `;
    } else if (minutes >= 1) {
      totalSectionTime.textContent = `
        It took you ${formattedNumber(minutes)}:${formattedNumber(seconds)}
      `;
    } else if (seconds >= 0) {
      totalSectionTime.textContent = `
        It took you ${formattedNumber(seconds)} seconds!
      `;
    }
  }

  // Points and timer
  if (infoContainer !== null) {
    infoContainer.classList.add('hidden');
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

  if (resultsPopup !== null && resultsContainer !== null) {
    resultsPopup.classList.remove('result-in-animation');
    resultsContainer.classList.remove('result-in-animation');
    resultsContainer.classList.add('result-out-animation');
    setTimeout(() => {
      resultsPopup.classList.add('result-out-animation');
      setTimeout(() => {
        resultsContainer.classList.remove('result-out-animation');
        resultsPopup.classList.remove('result-out-animation');
        resultsPopup.classList.add('hidden');
      }, .5 * 1000);
    }, .3 * 1000);
  }
  // Hide result container when restarting the quiz

  if (infoContainer !== null) {
    infoContainer.classList.remove('hidden');
  }
  // Show score counter when quiz starts again

  // a11y
  restartQuizBtn?.removeAttribute('aria-label');
  questionsContainer?.setAttribute('tabindex', '0');
  updateTimer();
  updateScoreDisplay();
  updateCounterDisplay();
  usersCorrectAnswers = 0;
  randomQuestions = getRandomQuestions();
  showNextQuestion(); 
  startTimer();
  // Activate the quiz again
}
