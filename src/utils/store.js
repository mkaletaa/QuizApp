import { create } from 'zustand'

import { compareGoodInfiniteStreak, compareInfiniteStreak } from './utilStorage'

const useStore = create(set => ({
  carousel: false, // should the carousel be enabled or not
  images: [], //images to display in the carousel
  showBottomSheet: false,
  bottomSheetSnapIndex: 0,
  bottomSheetContent: [],
  infiniteStreak: 0,
  goodInfiniteStreak: 0,
  hljsStyle: 'nightOwl',
  shuffle: false, //shuffle questions
  hide: false, //hide answers in Quiz
  setHljsStyle: style => set({ hljsStyle: style }),
  toggleShuffle: () =>
    set(state => {
      return { shuffle: !state.shuffle }
    }),
  toggleHide: () =>
    set(state => {
      return { hide: !state.hide }
    }),
  addImage: (imageUrl, imageDes) => {
    set(state => ({
      images: [...state.images, { url: imageUrl, des: imageDes }],
    }))
  },
  removeImage: imageUrl =>
    set(state => ({ images: state.images.filter(img => img !== imageUrl) })),
  clearImages: () => set({ images: [] }),
  enableCarousel: () => set(() => ({ carousel: true })),
  disableCarousel: () => set(() => ({ carousel: false })),
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

