import {
  getValue,
  setValue,
  removeKey,
  removeQuestion,
} from '../src/utils/utilStorage'
import AsyncStorage from '@react-native-async-storage/async-storage'

describe('AsyncStorage functions', () => {
  beforeEach(async () => {
    await AsyncStorage.clear()
  })

  test('should set and get a value', async () => {
    await setValue('testKey', { data: 'testData' })
    const value = await getValue('testKey')
    expect(value).toEqual({ data: 'testData' })
  })

  test('should remove a key', async () => {
    await setValue('testKey', { data: 'testData' })
    await removeKey('testKey')
    const value = await getValue('testKey')
    expect(value).toBeNull()
  })

  test('should remove a specific item from savedItems', async () => {
    await setValue('savedItems', ['item1', 'item2', 'item3'])
    await removeQuestion('item2')
    const value = await getValue('savedItems')
    expect(value).toEqual(['item1', 'item3'])
  })
})
