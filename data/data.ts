//if a name consists of more than one words, separate them with underscore
export const chapters = [
  {
    name: 'elektronika',
    image:
      'https://i.postimg.cc/cLqQPLB8/66583146-processore-del-computer-e-chip-di-sistema-della-scheda-madre-chip-della-cpu-circuito-elettr.jpg',
    des: 'Wszystkie informacje z tego rozdziału wziąłem <a href="https://mega.nz/folder/MN0FRDqT#E07ZRcEyDT8d-hi58KpdDg/folder/lcdE3DDS">stąd</a> i <a href="https://wieik.ovh/dokuph_8.html">stąd</a>. Te źródła nie są moje, więc jak coś jest źle to pretensje nie do mnie.',
  },
  {
    name: 'cat_1',
    image: 'https://reactjs.org/logo-og.png',
    des: 'short descirtption of a cat_1',
  },
  {
    name: 'cat_2',
    image: 'https://reactjs.org/logo-og.png',
    des: 'short descirtption of a cat_2',
  },
  {
    name: 'general_information',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZTa673aG483dj7Rw6OeKA3xJPz9i-RloR_g&usqp=CAU',
    des: 'short descirtption of a general_information',
  },
  {
    name: 'JS_fundamentals',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZTa673aG483dj7Rw6OeKA3xJPz9i-RloR_g&usqp=CAU',
    des: 'short descirtption of a JS_fundamentals',
  },
]
//also id of questions should go like "cat_1|top_1|1"
//main keys must be exact the same as names of categories
export const topics = {
  elektronika: [
    {
      name: 'wzmacniacz_operacyjny',
      image: 'https://i.postimg.cc/hjH8LLMh/WO.png',
    },
  ],
  cat_1: [
    {
      name: 'top_1',
      image:
        'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg',
    },
    { name: 'top_2', image: 'https://reactjs.org/logo-og.png' },
    { name: 'top_3', image: 'https://reactjs.org/logo-og.png' },
  ],
  cat_2: [
    { name: 'top_21', image: 'https://reactjs.org/logo-og.png' },
    { name: 'top_22', image: 'https://reactjs.org/logo-og.png' },
    { name: 'top_21', image: 'https://reactjs.org/logo-og.png' },
    { name: 'top_22', image: 'https://reactjs.org/logo-og.png' },
    { name: 'top_21', image: 'https://reactjs.org/logo-og.png' },
    { name: 'top_22', image: 'https://reactjs.org/logo-og.png' },

    { name: 'top_21', image: 'https://reactjs.org/logo-og.png' },
    { name: 'top_22', image: 'https://reactjs.org/logo-og.png' },
    { name: 'top_21', image: 'https://reactjs.org/logo-og.png' },
    { name: 'top_22', image: 'https://reactjs.org/logo-og.png' },

    { name: 'top_21', image: 'https://reactjs.org/logo-og.png' },
    { name: 'top_22', image: 'https://reactjs.org/logo-og.png' },
  ],
  general_information: [
    { name: 'historical_background', image: 'https://reactjs.org/logo-og.png' },
    { name: 'about_JavaScript', image: 'https://reactjs.org/logo-og.png' },
  ],
  JS_fundamentals: [
    { name: 'Hello_World', image: 'https://reactjs.org/logo-og.png' },
    { name: 'comments', image: 'https://reactjs.org/logo-og.png' },
    { name: 'variables', image: 'https://reactjs.org/logo-og.png' },
    { name: 'conditionals', image: 'https://reactjs.org/logo-og.png' },
    { name: 'loops', image: 'https://reactjs.org/logo-og.png' },
  ],
}
