//if a name consists of more than one words, separate them with underscore
export const categories = [
  { name: 'cat_1', pic: 'ss', des: 'short descirtption of a cat_1' },
  { name: 'cat_2', pic: 'ss', des: 'short descirtption of a cat_2' },
  { name: 'cat_3', pic: 'ss', des: 'short descirtption of a cat_3' },
]

//main keys must be exact the same as names of categories
export const topics = {
  cat_1: [
    { name: 'top_1', pic: 'ss', des: 'short descirtption of a top_1' },
    { name: 'top_2', pic: 'ss', des: 'short descirtption of a top_2' },
    { name: 'top_3', pic: 'ss', des: 'short descirtption of a top_3' },
  ],
  cat_2: [
    { name: 'top 21', pic: 'ss', des: 'short descirtption of a top_1' },
    { name: 'top 22', pic: 'ss', des: 'short descirtption of a top_2' },
    { name: 'top 23', pic: 'ss', des: 'short descirtption of a top_3' },
  ],
  cat_3: [
    { name: 'top 31', pic: 'ss', des: 'short descirtption of a top_1' },
    { name: 'top 32', pic: 'ss', des: 'short descirtption of a top_2' },
    { name: 'top 33', pic: 'ss', des: 'short descirtption of a top_3' },
  ],
}


export const top_1 = {
  componentType: 'View',
  props: {
    style: {
      backgroundColor: 'blue',
      padding: 10,
    },
    children: [
      {
        componentType: 'Text',
        props: {
          style: {
            color: 'white',
          },
          children: 'Hello, World!',
        },
      },
    ],
  },
}

export const top_2 = {
  componentType: 'View',
  props: {
    style: {
      backgroundColor: 'blue',
      padding: 10,
    },
    children: [
      {
        componentType: 'Text',
        props: {
          style: {
            color: 'white',
          },
          children: 'HoodBye, World!',
        },
      },
    ],
  },
}

export const theories = [
  { 
    name: 'top_1',
    componentType: 'View',
    props: {
      style: {
        backgroundColor: 'blue',
        padding: 10,
      },
      children: [
        {
          componentType: 'Text',
          props: {
            style: {
              color: 'white',
            },
            children: 'Hello, World!',
          },
        },
      ],
    },
  },
////////////////////
  {
    name: 'top_2',    
    componentType: 'View',
    props: {
      style: {
        backgroundColor: 'blue',
        padding: 10,
      },
      children: [
        {
          componentType: 'Text',
          props: {
            style: {
              color: 'white',
            },
            children: 'GoodBye, World!',
          },
        },
      ],
    },
  },
]