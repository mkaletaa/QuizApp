//if a name consists of more than one words, separate them with underscore
// if a chapter does not have any description it should be an empty string
export const chapters = [
  {
    name: 'general_information',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZTa673aG483dj7Rw6OeKA3xJPz9i-RloR_g&usqp=CAU',
  },
  {
    name: 'JS_fundamentals',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZTa673aG483dj7Rw6OeKA3xJPz9i-RloR_g&usqp=CAU',
    des: 'short descirtption of a JS_fundamentals',
  },
  {
    name: 'data_structures',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZTa673aG483dj7Rw6OeKA3xJPz9i-RloR_g&usqp=CAU',
    des: "Some say everything is an object in JavaScript. Is that true? You'll find the answer in this chapter.",
  },
]
//also id of questions should go like "cat_1|top_1|1"
//main keys must be exact the same as names of categories
export const topics = {
  general_information: [
    { name: 'historical_background', image: 'https://reactjs.org/logo-og.png' },
    { name: 'about_JavaScript', image: 'https://reactjs.org/logo-og.png' },
    { name: 'test', image: 'https://test.jpg' },
  ],
  JS_fundamentals: [
    { name: 'Hello_World', image: 'https://reactjs.org/logo-og.png' },
    { name: 'comments', image: 'https://reactjs.org/logo-og.png' },
    { name: 'operators', image: 'https://reactjs.org/logo-og.png' },
    { name: 'variables', image: 'https://reactjs.org/logo-og.png' },
    { name: 'conditionals', image: 'https://reactjs.org/logo-og.png' },
    { name: 'loops', image: 'https://reactjs.org/logo-og.png' },
    { name: 'functions', image: 'https://reactjs.org/logo-og.png' },
    { name: 'functions #2', image: 'https://reactjs.org/logo-og.png' },
  ],
  data_structures: [
    { name: 'introduction', image: 'https://reactjs.org/logo-og.png' },
    { name: 'type_conversion', image: 'https://reactjs.org/logo-og.png' },
    { name: 'numbers', image: 'https://reactjs.org/logo-og.png' },
    { name: 'strings', image: 'https://reactjs.org/logo-og.png' },
    { name: 'arrays', image: 'https://reactjs.org/logo-og.png' },
    { name: 'iteration_methods', image: 'https://reactjs.org/logo-og.png' },
  ],
}

