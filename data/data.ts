//if a name consists of more than one words, separate them with underscore
// if a chapter does not have any description it should be an empty string
export const chapters = [
  {
    name: 'cat_1',
    image: 'https://reactjs.org/logo-og.png',
    des: '',
  },
  {
    name: 'cat_2',
    image: 'https://reactjs.org/logo-og.png',
    des: 'short descirtption of a cat_2short descirtption of a cat_2short descirtption of a cat_2short descirtption of a cat_2short descirtption of ',
  },
]
//also id of questions should go like "cat_1|top_1|1"
//main keys must be exact the same as names of categories
export const topics = {
  cat_1: [
    {
      name: 'top_1',
      image:
        'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg',
    },
    { name: 'top_2', image: 'https://reactjs.org/logo-og.png' },
    { name: 'top_3', image: 'https://reactjs.org/logo-og.png', soon: false},
  ],
  cat_2: [
    { name: 'top_21', image: 'https://reactjs.org/logo-og.png' },
    { name: 'top_22', image: 'https://reactjs.org/logo-og.png' },
  ]
}
