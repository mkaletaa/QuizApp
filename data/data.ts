//if a name consists of more than one words, separate them with underscore
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
}
