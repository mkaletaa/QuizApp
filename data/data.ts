//if a name consists of more than one words, separate them with underscore
// if a chapter does not have any description it should be an empty string
export const chapters = [
  {
    name: 'general_information',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZTa673aG483dj7Rw6OeKA3xJPz9i-RloR_g&usqp=CAU',
    des: '',
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
  {
    name: 'OOP',
    image: '',
    des: '',
    soon: true,
  },
  {
    name: 'asynchronicity',
    image: '',
    des: '',
  },
  {
    name: 'TypeScript',
    image: '',
    des: '',
    soon: true,
  },
  {
    name: 'miscellaneous',
    image: '',
    des: '',
  },
  {
    name: 'further_reading',
    image: '',
    des: 'You\'ve already gained basic knowledge of JavaScript. Now it\'s time to choose the path you want to follow next.',
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
    { name: 'objects_fundamentals', image: 'https://reactjs.org/logo-og.png' },
    { name: 'other_types', image: '', soon: true },
    { name: 'destructuring', image: '', soon: true },
    { name: 'iteration_methods', image: '', soon: true },
  ],
  OOP: [
    { name: 'objects_-_advanced_topics', image: '' }, //object_create
    { name: 'reference_and_copying', image: '' },
    { name: 'inheritance', image: '' },
    { name: 'constructor', image: '' },
    { name: 'class', image: '' },
    { name: 'encapsulation', image: '' },
    { name: 'inbuilt_objects', image: '' }, //Math, Date, Error, global
    { name: 'extending_inbuilt_objects', image: '' }, //Error extensions
  ],
  asynchronicity: [
    { name: 'setTimeout_and_setInterval', image: '' },
    { name: 'promises', image: '' },
    { name: 'async_and_await', image: '' },
    { name: 'event_loop', image: '', soon: true },
  ],
  miscellaneous: [
    { name: 'error_handling', image: '' },
    { name: 'executional_context', image: '' },
    { name: 'strict_mode', image: '' },
  ],
  TypeScript: [
    { name: 'introduction', image: '' }, //what is TS, why use it, how to download, Node and TS
    { name: 'basic_types', image: '' }, //unions, intersections, tuples, Arrays, enums, any, unknown, never
    { name: 'types_vs_interfaces', image: '' },
    { name: 'utility_types', image: '' },
  ],
  further_reading: [
    { name: 'frontend', image: '' },
    { name: 'backend', image: '' },
    { name: 'mobile_dev', image: '' },
    { name: 'desktop_apps', image: '' },
  ],
}
