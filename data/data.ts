//if a name consists of more than one words, separate them with underscore
// if a chapter does not have any description it should be an empty string
export const chapters = [
  {
    name: 'about_JavaScript',
    image: 'https://i.postimg.cc/VvKggWKn/about-JS.png',
    des: '',
  },
  {
    name: 'fundamentals',
    image: 'https://i.postimg.cc/BbLKY1BX/fundamentals.png',
    des: '',
  },
  {
    name: 'data_types',
    image: 'https://i.postimg.cc/qgfFyLqw/data-types.png',
    des: "Some say everything is an object in JavaScript. Is that true? You'll find the answer in this chapter.",
  },
  {
    name: 'Object_oriented_JS',
    image: 'https://i.postimg.cc/m2Z3MVqg/OOP.png',
    des: '',
    soon: true,
  },
  {
    name: 'asynchronicity',
    image: 'https://i.postimg.cc/hvR8038X/asynchronicity.png',
    des: '',
  },
  {
    name: 'TypeScript',
    image: 'https://i.postimg.cc/SQPQ7x1Y/TS.png',
    des: '',
  },
  {
    name: 'miscellaneous',
    image: 'https://i.postimg.cc/rFjzDnhy/miscellaneous.png',
    des: '',
  },
  {
    name: 'next_steps',
    image: 'https://i.postimg.cc/VNVP5XqG/next-steps.png',
    des: "You've already gained basic knowledge of JavaScript. Now it's time to choose the path you want to follow next.",
  },
]
//also id of questions should go like "cat_1|top_1|1"
//main keys must be exact the same as names of categories
export const topics = {
  about_JavaScript: [
    {
      name: 'historical_background',
      image: 'https://i.postimg.cc/3N892cF3/history.png',
    },
    {
      name: 'general_information',
      image: 'https://i.postimg.cc/qBw1pppq/info.png',
    },
  ],
  fundamentals: [
    {
      name: 'first_steps',
      image: 'https://i.postimg.cc/DyJC8nMc/first-steps.png',
    },
    { name: 'comments', image: 'https://i.postimg.cc/d3r1pMLK/comments.png' },
    { name: 'operators', image: 'https://i.postimg.cc/43RGd84W/operators.png' },
    { name: 'variables', image: 'https://i.postimg.cc/pXpfqCQV/variables.png' },
    {
      name: 'declaration_keywords',
      image: 'https://i.postimg.cc/jSTxr6cy/keywords.png',
    },
    {
      name: 'conditionals',
      image: 'https://i.postimg.cc/Y0FKMYc5/conditionals.png',
    },
    { name: 'loops', image: 'https://i.postimg.cc/wBMr9LLw/loops.png' },
    {
      name: 'functions_#1',
      image: 'https://i.postimg.cc/Kj5X1Fzf/functions.png',
    },
    {
      name: 'functions_#2',
      image: 'https://i.postimg.cc/BnrhfkZn/functions2.png',
    },
  ],
  data_types: [
    {
      name: 'introduction',
      image: 'https://i.postimg.cc/wj0nSJwj/data-intro.png',
    },
    {
      name: 'type_conversion',
      image: 'https://i.postimg.cc/JnfYchtm/banana.png',
    },
    {
      name: 'numbers',
      image: 'https://i.postimg.cc/Gmmb8bN9/data-numbers.png',
    },
    {
      name: 'strings',
      image: 'https://i.postimg.cc/Bn742d9p/data-strings.png',
    },
    { name: 'arrays', image: 'https://i.postimg.cc/TPyG0CT6/data-arrays.png' },
    {
      name: 'objects_fundamentals',
      image: 'https://i.postimg.cc/LsrSbLsZ/data-objects.png',
    },
    {
      name: 'other_types',
      image: 'https://i.postimg.cc/SKZ22ZDb/data-other.png',
      soon: true,
    },
    {
      name: 'iteration_techniques',
      image: 'https://i.postimg.cc/pTH4mk9B/iteration.png',
      soon: true,
    },
  ],
  Object_oriented_JS: [
    { name: 'Object.create()', image: '' },
    { name: 'object_methods', image: '' }, 
    { name: 'prototype_and_inheritance', image: '' },
    { name: 'custom_types', image: '' },
    { name: 'encapsulation', image: '' },
    { name: 'class_inheritance', image: '' },
    { name: 'built-in_objects', image: '' }, //Math, Date, Error, global
    // { name: 'extending_inbuilt_objects', image: '' }, //Error extensions
  ],
  asynchronicity: [
    {
      name: 'timeouts_and_intervals',
      image: 'https://i.postimg.cc/7h13tMXm/timeouts.png',
    },
    { name: 'promises', image: 'https://i.postimg.cc/yYwXrGT6/promises.png' },
    {
      name: 'async_and_await',
      image: 'https://i.postimg.cc/tRFNgpyW/async.png',
    },
    {
      name: 'event_loop',
      image: 'https://i.postimg.cc/65wL2g5S/event-loop.png',
    },
  ],
  miscellaneous: [
    {
      name: 'error_handling',
      image: 'https://i.postimg.cc/HLp2QhmS/errors.png',
    },
    {
      name: 'execution_context',
      image: 'https://i.postimg.cc/zBQFYDgM/context.png',
    },
    { name: 'strict_mode', image: 'https://i.postimg.cc/CKm4JsLw/strict.png' },
    {
      name: 'spread_and_rest',
      image: 'https://i.postimg.cc/ncjywstB/spread2.png',
    },
    {
      name: 'destructuring',
      image: 'https://i.postimg.cc/G2txfTHG/destructuring.png',
    },
    // {
    //   name: 'iterators_and_generators',
    //   image: 'https://i.postimg.cc/fyxtqMjY/data-iter.png',
    //   soon: true,
    // },
  ],
  TypeScript: [
    {
      name: 'introduction',
      image: 'https://i.postimg.cc/PqsD54ny/TS-intro.png',
    }, //what is TS, why use it, how to download, Node and TS
    { name: 'types', image: 'https://i.postimg.cc/ZnRBMs6b/TS-types.png' },
    {
      name: 'type_aliases_vs_interfaces',
      image: 'https://i.postimg.cc/tT9Vh4TV/TS-t-vs-i.png',
    },
    {
      name: 'generics',
      image: 'https://i.postimg.cc/q7s3h3kT/TS-generics.png',
    },
    {
      name: 'utility_types',
      image: 'https://i.postimg.cc/4yS7kv1z/TS-utility.png',
    },
    {
      name: 'tips_and_tricks',
      image: 'https://i.postimg.cc/63z4zx2b/TS-tips.png',
    },
  ],
  next_steps: [
    { name: 'frontend', image: 'https://i.postimg.cc/7Lr3gRqj/frontend.png' },
    { name: 'backend', image: 'https://i.postimg.cc/k5Nxwy4G/backend.png' },
    { name: 'mobile_dev', image: 'https://i.postimg.cc/t4xdnbGh/mobile.png' },
    {
      name: 'desktop_apps',
      image: 'https://i.postimg.cc/mDb7nFzw/desktop.png',
    },
  ],
}
