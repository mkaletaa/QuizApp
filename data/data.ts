//if a name consists of more than one words, separate them with underscore
// if a chapter does not have any description it should be an empty string
export const chapters = [
  {
    name: 'about_JavaScript',
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
    name: 'Object_oriented_JS',
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
    des: "You've already gained basic knowledge of JavaScript. Now it's time to choose the path you want to follow next.",
  },
]
//also id of questions should go like "cat_1|top_1|1"
//main keys must be exact the same as names of categories
export const topics = {
  about_JavaScript: [
    { name: 'historical_background', image: 'https://reactjs.org/logo-og.png' },
    { name: 'general_information', image: 'https://reactjs.org/logo-og.png' },
  ],
  JS_fundamentals: [
    { name: 'Hello_World', image: 'https://reactjs.org/logo-og.png' },
    { name: 'comments', image: 'https://reactjs.org/logo-og.png' },
    { name: 'operators', image: 'https://reactjs.org/logo-og.png' },
    { name: 'variables', image: 'https://reactjs.org/logo-og.png' },
    { name: 'declaration_keywords', image: 'https://reactjs.org/logo-og.png' },
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
    { name: 'other_structures', image: '', soon: true },
    { name: 'destructuring', image: '', soon: true },
    { name: 'iteration_methods', image: '', soon: true },
  ],
  Object_oriented_JS: [
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
    { name: 'timeouts_and_intervals', image: '' },
    { name: 'promises', image: '' },
    { name: 'async_and_await', image: '' },
    { name: 'event_loop', image: '', soon: true },
  ],
  miscellaneous: [
    { name: 'error_handling', image: '' },
    { name: 'execution_context', image: '' },
    { name: 'strict_mode', image: '' },
    { name: 'eval', image: '', soon: true },
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
