import create from 'zustand'

const useStore = create(set => ({
  images: [],
  // lastIndex: -1, // Dodajemy pole przechowujące ostatni używany indeks
  addImage: (imageUrl, imageDes) => {
    set(state => ({
      images: [
        ...state.images,
        { url: imageUrl, des: imageDes}
      ] // Nowy obraz zwiększa indeks o 1
      // lastIndex: state.lastIndex + 1, // Aktualizacja wartości ostatniego indeksu
    }))
  },
  removeImage: imageUrl =>
    set(state => ({ images: state.images.filter(img => img !== imageUrl) })),
  clearImages: () => set({ images: []}), // Czyszczenie obrazów powinno zresetować również ostatni indeks
}))

export default useStore
