//if a name consists of more than one words, separate them with underscore
export const chapters = [
  {
    name: 'analiza',
    image: 'https://i.postimg.cc/Df9Ht5kQ/image.png',
    des: 'Analiza matematyczna to dziedzina matematyki zajmująca się badaniem granic, pochodnych, całek oraz ciągłości funkcji, kluczowych dla modelowania i rozumienia zmian w różnych kontekstach.',
  },
  {
    name: 'algebra',
    image: 'https://i.postimg.cc/1zmN0WDG/image.png',
    des: 'Algebra to dział matematyki zajmujący się badaniem struktur, relacji i operacji na zbiorach liczb i symboli.',
  },
]
//also id of questions should go like "cat_1|top_1|1"
//main keys must be exact the same as names of categories
export const topics = {
  analiza: [
    {
      name: 'granice',
      image: 'https://i.postimg.cc/3NYr1hBN/image.png',
    },
    { name: 'pochodne', image: 'https://i.postimg.cc/yN4McPnY/image.png' },
    { name: 'całki', image: 'https://i.postimg.cc/L8MP54X0/ca-ka.png' },
  ],
}
