import create from 'zustand'

const useStore = create(set => ({
  images: [],
  carousel: false, // Dodanie stanu carousel
  showPrompt: false, // Dodanie stanu showPrompt
  addImage: (imageUrl, imageDes) => {
    set(state => ({
      images: [...state.images, { url: imageUrl, des: imageDes }],
    }))
  },
  removeImage: imageUrl =>
    set(state => ({ images: state.images.filter(img => img !== imageUrl) })),
  clearImages: () => set({ images: [] }), // Czyszczenie obrazów powinno zresetować również ostatni indeks
  enableCarousel: () => set(state => ({ carousel: true })), // Funkcja do przełączania wartości carousel
  disableCarousel: () => set(state => ({ carousel: false })), // Funkcja do przełączania wartości carousel
  setShowPrompt: value => set({ showPrompt: value }), // Funkcja ustawiająca stan showPrompt
}))

export default useStore
