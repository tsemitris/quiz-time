interface IQuestion {
  question: string;
  answers: string[];
  correctAnswer: string;
}

const questions: IQuestion[] = [
  {
    question: 'Which of these companies does NOT manufacture automobiles?',
    answers: ['Nissan', 'Fiat', 'Ducati'],
    correctAnswer: 'Ducati',
  },
  {
    question: 'What did the Spanish autonomous community of Catalonia ban in 2010, that took effect in 2012?',
    answers: ['Fiestas', 'Bullfighting', 'Mariachi'],
    correctAnswer: 'Bullfighting',
  },
  {
    question: 'What alcoholic drink is mainly made from juniper berries?',
    answers: ['Gin', 'Vodka', 'Rum'],
    correctAnswer: 'Gin',
  },
  {
    question: 'What is the highest number of Michelin stars a restaurant can receive?',
    answers: ['Three', 'Four', 'Five'],
    correctAnswer: 'Three',
  },
  {
    question: 'Which automobile manufacturer gained majority control of U.S. automobile manufacturer Chrysler in 2011?',
    answers: ['Fiat', 'Alfa Romeo', 'Ferrari'],
    correctAnswer: 'Fiat',
  },
  {
    question: 'Where did the pineapple plant originate?',
    answers: ['Hawaii', 'South America', 'Asia'],
    correctAnswer: 'South America',
  },
  {
    question: 'After how many years would you celebrate your crystal anniversary?',
    answers: ['10', '15', '20'],
    correctAnswer: '15',
  },
  {
    question: 'The Fields Medal, one of the most sought after awards in mathematics, is awarded every how many years?',
    answers: ['3', '4', '5'],
    correctAnswer: '4',
  },
  {
    question: 'Which country has the most Trappist breweries?',
    answers: ['Netherlands', 'Belgium', 'USA'],
    correctAnswer: 'USA',
  },
  {
    question: 'A doctor with a PhD is a doctor of what?',
    answers: ['Psychology', 'Phrenology', 'Philosophy'],
    correctAnswer: 'Philosophy',
  },
  {
    question: 'What does a milliner make and sell?',
    answers: ['Hats', 'Belts', 'Shirts'],
    correctAnswer: 'Hats',
  },
  {
    question: 'Which item of clothing is usually worn by a Scotsman at a wedding?',
    answers: ['Kilt', 'Dress', 'Rhobes'],
    correctAnswer: 'Kilt',
  },
  {
    question: 'Frank Lloyd Wright was the architect behind what famous building?',
    answers: ['Sydney Opera House', 'The Space Needle', 'The Guggenheim'],
    correctAnswer: 'The Guggenheim',
  },
  {
    question: 'In a standard set of playing cards, which is the only king without a moustache?',
    answers: ['Spades', 'Diamonds', 'Hearts'],
    correctAnswer: 'Hearts',
  },
  {
    question: 'What is the romanized Russian word for "winter"?',
    answers: ['Leto','Zima', 'Vesna'],
    correctAnswer: 'Zima',
  },
  {
    question: 'Apple co-founder Steve Jobs died from complications of which form of cancer?',
    answers: ['Liver','Stomach', 'Pancreatic'],
    correctAnswer: 'Pancreatic',
  },
  {
    question: 'Where does water from Poland Spring water bottles come from?',
    answers: ['Hesse, Germany','Masovia, Poland', 'Maine, United States'],
    correctAnswer: 'Maine, United States',
  },
  {
    question: 'In ancient Greece, if your job were a "hippeus" which of these would you own?',
    answers: ['Horse','Boat','Weave'],
    correctAnswer: 'Horse',
  },
  {
    question: 'What was the soft drink Pepsi originally introduced as?',
    answers: ['Pepsin Pop','Brads Drink','Carolina Cola'],
    correctAnswer: 'Brads Drink',
  },
  {
    question: 'Who invented Pastafarianism?',
    answers: ['Bill Nye','Zach Soldi','Bobby Henderson'],
    correctAnswer: 'Bobby Henderson',
  },
];

export {
  questions,
  type IQuestion,
};
