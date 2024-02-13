//* może zmienić answers na options

export const quiz = [
  {
    id: 4,
    multiChoice: false,
    question: 'What is the capital of France?',
    options: [
      { id: 1, answer: 'Paris', correct: true },
      { id: 2, answer: 'Rome', correct: false },
      { id: 3, answer: 'Berlin', correct: false },
      { id: 4, answer: 'Madrid', correct: false },
    ],
    explanation: [
      {
        componentType: 'Text', // Dodajemy komponent Image
        value: 'French capital',
      },
      {
        componentType: 'Text', // Dodajemy komponent Image
        value: ' is definitely Paris',
      },
      {
        componentType: 'Image', // Dodajemy komponent Image
        value: 'https://legacy.reactjs.org/logo-og.png',
      },
    ],
  },
  {
    id: 5,
    multiChoice: true,
    question: 'React CLI?',
    options: [
      { id: 1, answer: 'create react app', correct: false },
      { id: 2, answer: 'create next app', correct: true },
      { id: 3, answer: 'create vite app', correct: true },
    ],
    explanation: 'CRA is outdated',
  },
  {
    id: 6,
    multiChoice: false,
    question: [
      {
        componentType: 'Text', // Dodajemy komponent Image
        value: 'What can be put on pizza',
      },
      {
        componentType: 'Text', // Dodajemy komponent Image
        value: 'Except pineapple ofc',
      },
      {
        componentType: 'Image', // Dodajemy komponent Image
        value: 'https://legacy.reactjs.org/logo-og.png',
      },
    ],
    options: [
      {
        id: 1,
        answer: 'chocolate',
        correct: false,
        componentType: 'Text',
        props: {},
      },
      { id: 2, answer: 'cheese', correct: true },
    ],
    explanation: '...',
  },
]
