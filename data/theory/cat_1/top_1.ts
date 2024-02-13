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
      {
        componentType: 'Image', // Dodajemy komponent Image
        props: {
          source: {uri: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg' }, // Tutaj umieść ścieżkę do zdjęcia lub URL
          style: {
            width: 100,
            height: 100,
          },
        },
      },
    ],
  },
}
