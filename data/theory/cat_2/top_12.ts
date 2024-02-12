export const top_12 = {
  name: 'top_12',
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
