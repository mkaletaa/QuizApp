import {create} from 'zustand'

const useStore = create(set => ({
  carousel: false, // should the carousel be enabled or not
  images: [], //images to display in the carousel
  showPopup: false, // should a popup in Theory/ItemResult be shown
  addImage: (imageUrl, imageDes) => {
    set(state => ({
      images: [...state.images, { url: imageUrl, des: imageDes }],
    }))
  },
  removeImage: imageUrl =>
    set(state => ({ images: state.images.filter(img => img !== imageUrl) })),
  clearImages: () => set({ images: [] }),
  enableCarousel: () => set(state => ({ carousel: true })),
  disableCarousel: () => set(state => ({ carousel: false })),
  setShowPopup: value => set({ showPopup: value }),
}))

export default useStore
