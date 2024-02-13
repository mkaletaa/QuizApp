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
      {
        componentType: 'Image', // Dodajemy komponent Image
        props: {
          source: {
            uri: 'icon',
          }, // Tutaj umieść ścieżkę do zdjęcia lub URL
          style: {
            width: 100,
            height: 100,
          },
        },
      },
    ],
  },
}
