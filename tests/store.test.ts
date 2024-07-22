import useStore from '../src/utils/store'

describe('useStore', () => {
  beforeEach(() => {
    const store = useStore.getState()
    store.clearImages()
    store.disableCarousel()
  })

  test('should add an image', () => {
    const { addImage } = useStore.getState()
    addImage('http://example.com/image1.jpg', 'Image 1')
    const { images } = useStore.getState()
    expect(images).toEqual([
      { url: 'http://example.com/image1.jpg', des: 'Image 1' },
    ])
  })

//   test('should remove an image', () => {
//     const { addImage, removeImage } = useStore.getState()
//     addImage('http://example.com/image1.jpg', 'Image 1')
//     addImage('http://example.com/image2.jpg', 'Image 2')
//     removeImage('http://example.com/image1.jpg')
//     const { images } = useStore.getState()
//     expect(images).toEqual([
//       { url: 'http://example.com/image2.jpg', des: 'Image 1' },
//     ])
//   })

  test('should clear all images', () => {
    const { addImage, clearImages } = useStore.getState()
    addImage('http://example.com/image1.jpg', 'Image 1')
    addImage('http://example.com/image2.jpg', 'Image 2')
    clearImages()
    const { images } = useStore.getState()
    expect(images).toEqual([])
  })

  test('should enable the carousel', () => {
    const { enableCarousel } = useStore.getState()
    enableCarousel()
    const { carousel } = useStore.getState()
    expect(carousel).toBe(true)
  })

  test('should disable the carousel', () => {
    const { disableCarousel } = useStore.getState()
    disableCarousel()
    const { carousel } = useStore.getState()
    expect(carousel).toBe(false)
  })
})
