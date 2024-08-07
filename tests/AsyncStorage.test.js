import AsyncStorage from '@react-native-async-storage/async-storage'

import {
  getValue,
  removeKey,
//   removeQuestion,
  setValue,
} from '../src/utils/utilStorage'

describe('Basic AsyncStorage Functions', () => {
  beforeEach(() => {
    AsyncStorage.clear()
  })

  it('should set a value in AsyncStorage', async () => {
    await setValue('testKey', 'testValue')
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'testKey',
      JSON.stringify('testValue'),
    )
  })

  it('should get a value from AsyncStorage', async () => {
    AsyncStorage.getItem.mockResolvedValue(JSON.stringify('testValue'))
    const value = await getValue('testKey')
    expect(value).toBe('testValue')
    expect(AsyncStorage.getItem).toHaveBeenCalledWith('testKey')
  })

  it('should return null if key does not exist in AsyncStorage', async () => {
    AsyncStorage.getItem.mockResolvedValue(null)
    const value = await getValue('nonExistentKey')
    expect(value).toBeNull()
    expect(AsyncStorage.getItem).toHaveBeenCalledWith('nonExistentKey')
  })

  it('should remove a key from AsyncStorage', async () => {
    await removeKey('testKey')
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith('testKey')
  })

//   it('should remove a question from AsyncStorage', async () => {
//     const id1 = 'cat_1|top_1|1'
//     await setValue('savedItems', id1)
//     let items = await getValue('savedItems')
//     console.log('🚀 ~ it.only ~ items:', items)

//     const id2 = 'cat_1|top_1|2'
//     await setValue('savedItems', id2)
//     items = await getValue('savedItems')
//     console.log('🚀 ~ it.only ~ items:', items)

//     const id3 = 'cat_1|top_1|3'
//     await setValue('savedItems', id3)
//     items = await getValue('savedItems')
//     console.log('🚀 ~ it.only ~ items:', items)

//     await removeQuestion(id1)

//     const savedItems = await getValue('savedItems')
//     // console.log("🚀 ~ it.only ~ savedItems:", savedItems)

//     // let parsedSavedItems = savedItems ? JSON.parse(savedItems) : []

//     // expect(parsedSavedItems).toEqual(['cat_1|top_1|2', 'cat_1|top_1|3'])
//   })
})
