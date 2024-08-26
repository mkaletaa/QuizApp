import { create } from 'zustand'

import { compareGoodInfiniteStreak, compareInfiniteStreak } from './utilStorage'

const useStore = create(set => ({
  carousel: false, // should the carousel be enabled or not
  images: [], //images to display in the carousel
  // showPopup: false, // should a popup in Theory/ItemResult be shown
  showBottomSheet: false,
  bottomSheetSnapIndex: 0,
  bottomSheetContent: [],
  infiniteStreak: 0,
  goodInfiniteStreak: 0,
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
  incrementInfiniteStreak: () =>
    set(state => {
      console.log('infiniteStreak: ', state.infiniteStreak)
      return { infiniteStreak: state.infiniteStreak + 1 }
    }),
  resetInfiniteStreak: () =>
    set(state => {
      compareInfiniteStreak(state.infiniteStreak)
      return { infiniteStreak: 0 }
    }),
  incrementGoodInfiniteStreak: () =>
    set(state => {
      console.log('good infiniteStreak: ', state.goodInfiniteStreak)
      return { goodInfiniteStreak: state.goodInfiniteStreak + 1 }
    }),
  resetGoodInfiniteStreak: () =>
    set(state => {
      compareGoodInfiniteStreak(state.goodInfiniteStreak)
      return { goodInfiniteStreak: 0 }
    }),
}))

export default useStore
