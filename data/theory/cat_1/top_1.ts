export const top_1 = {
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
}
