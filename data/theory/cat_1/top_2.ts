export const top_2 = {
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
          children: 'Goodbye, World!',
        },
      },
    ],
  },
}
