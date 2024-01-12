interface IQuestion {
  question: string;
  answers: string[];
  correctAnswerIndex: number;
}

const questions: IQuestion[] = [
  {
    question: 'Which of these companies does NOT manufacture automobiles?',
    answers: ['Nissan', 'Fiat', 'Ducati'],
    correctAnswerIndex: 2,
  },
  {
    question: 'What did the Spanish autonomous community of Catalonia ban in 2010, that took effect in 2012?',
    answers: ['Fiestas', 'Bullfighting', 'Mariachi'],
    correctAnswerIndex: 1,
  },
  {
    question: 'What alcoholic drink is mainly made from juniper berries?',
    answers: ['Gin', 'Vodka', 'Rum'],
    correctAnswerIndex: 0,
  },
  {
    question: 'What is the highest number of Michelin stars a restaurant can receive?',
    answers: ['Three', 'Four', 'Five'],
    correctAnswerIndex: 0,
  },
  {
    question: 'Which automobile manufacturer gained majority control of U.S. automobile manufacturer Chrysler in 2011?',
    answers: ['Fiat', 'Alfa Romeo', 'Ferrari'],
    correctAnswerIndex: 0,
  },
  {
    question: 'Where did the pineapple plant originate?',
    answers: ['Hawaii', 'South America', 'Asia'],
    correctAnswerIndex: 1,
  },
  {
    question: 'After how many years would you celebrate your crystal anniversary?',
    answers: ['10', '15', '20'],
    correctAnswerIndex: 1,
  },
  {
    question: 'The Fields Medal, one of the most sought after awards in mathematics, is awarded every how many years?',
    answers: ['3', '4', '5'],
    correctAnswerIndex: 1,
  },
  {
    question: 'Which country has the most Trappist breweries?',
    answers: ['Netherlands', 'Belgium', 'USA'],
    correctAnswerIndex: 2,
  },
  {
    question: 'A doctor with a PhD is a doctor of what?',
    answers: ['Psychology', 'Phrenology', 'Philosophy'],
    correctAnswerIndex: 2,
  },
  {
    question: 'What does a milliner make and sell?',
    answers: ['Hats', 'Belts', 'Shirts'],
    correctAnswerIndex: 0,
  },
  {
    question: 'Which item of clothing is usually worn by a Scotsman at a wedding?',
    answers: ['Kilt', 'Dress', 'Rhobes'],
    correctAnswerIndex: 0,
  },
  {
    question: 'Frank Lloyd Wright was the architect behind what famous building?',
    answers: ['Sydney Opera House', 'The Space Needle', 'The Guggenheim'],
    correctAnswerIndex: 2,
  },
  {
    question: 'In a standard set of playing cards, which is the only king without a moustache?',
    answers: ['Spades', 'Diamonds', 'Hearts'],
    correctAnswerIndex: 2,
  },
  {
    question: 'What is the romanized Russian word for "winter"?',
    answers: ['Leto','Zima', 'Vesna'],
    correctAnswerIndex: 1,
  },
  {
    question: 'Apple co-founder Steve Jobs died from complications of which form of cancer?',
    answers: ['Liver','Stomach', 'Pancreatic'],
    correctAnswerIndex: 2,
  },
  {
    question: 'Where does water from Poland Spring water bottles come from?',
    answers: ['Hesse, Germany','Masovia, Poland', 'Maine, United States'],
    correctAnswerIndex: 2,
  },
  {
    question: 'In ancient Greece, if your job were a "hippeus" which of these would you own?',
    answers: ['Horse','Boat','Weave'],
    correctAnswerIndex: 0,
  },
  {
    question: 'What was the soft drink Pepsi originally introduced as?',
    answers: ['Pepsin Pop','Brads Drink','Carolina Cola'],
    correctAnswerIndex: 1,
  },
  {
    question: 'Who invented Pastafarianism?',
    answers: ['Bill Nye','Zach Soldi','Bobby Henderson'],
    correctAnswerIndex: 2,
  },
];

export {
  questions,
  type IQuestion,
};