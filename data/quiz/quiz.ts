export const quiz = [
  {
    id: 1,
    question: 'How old are you?',
    answers: [
      { id: 1, answer: '18', correct: false },
      { id: 2, answer: '19', correct: true },
      { id: 3, answer: '20', correct: false },
      { id: 4, answer: '21', correct: false },
    ]
  }, 
  {
    id: 2,
    question: 'What is your name?',
    answers: [
      { id: 1, answer: 'Carl', correct: false },
      { id: 2, answer: 'Emily', correct: true },
      { id: 3, answer: 'Eva', correct: true },
    ]
  },
  {
    id: 3,
    question: {
        componentType: 'Text', // Dodajemy komponent Image
        value: 'Do you have a pet?',
      },
    answers: [
      { id: 1, answer: 'yes', correct: false },
      { id: 2, answer: 'no', correct: true },
    ],
  },
]
