export const top_11 = {
  name: 'top_11',
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
