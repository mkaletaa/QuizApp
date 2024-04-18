import create from 'zustand'

const useStore = create(set => ({
  images: [],
  addImage: imageUrl =>
    set(state => ({ images: [...state.images, { url: imageUrl }] })),
  removeImage: imageUrl =>
    set(state => ({ images: state.images.filter(img => img !== imageUrl) })),
  clearImages: () => set({ images: [] }), 
}))

export default useStore
