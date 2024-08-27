import { create } from 'zustand'

const useStore = create(set => ({
  carousel: false, // should the carousel be enabled or not
  images: [], //images to display in the carousel
  // showPopup: false, // should a popup in Theory/ItemResult be shown
  showBottomSheet: false,
  bottomSheetSnapIndex: 0,
  bottomSheetContent: [],
  // navigateTo: undefined,
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
  setShowBottomSheet: show => set({ showBottomSheet: show }),
  setBottomSheetSnapIndex: index => set({ bottomSheetSnapIndex: index }),
  setBottomSheetContent: state => set({ bottomSheetContent: state }),
  // setNavigateTo: (destination, chapter, topic) => set({ navigateTo: {destination, chapter, topic} }),
}))

export default useStore

