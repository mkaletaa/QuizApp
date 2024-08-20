import AsyncStorage from '@react-native-async-storage/async-storage';



import { removeQuestion } from '../src/utils/utilStorage';


// Mocking AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}))

describe('AsyncStorage removeQuestion()', () => {
  beforeEach(() => {
    AsyncStorage.getItem.mockClear()
    AsyncStorage.setItem.mockClear()
  })

  it('should remove the specified question id from savedItems', async () => {
    const savedItems = JSON.stringify([1, 2, 3, 4])
    AsyncStorage.getItem.mockResolvedValue(savedItems)

    await removeQuestion(3)

    expect(AsyncStorage.getItem).toHaveBeenCalledWith('savedItems')
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'savedItems',
      JSON.stringify([1, 2, 4]),
    )
  })

  it('should handle the case when there are no saved items', async () => {
    AsyncStorage.getItem.mockResolvedValue(null)

    await removeQuestion(3)

    expect(AsyncStorage.getItem).toHaveBeenCalledWith('savedItems')
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'savedItems',
      JSON.stringify([]),
    )
  })

  it('should handle the case when savedItems does not contain the id', async () => {
    const savedItems = JSON.stringify([1, 2, 4])
    AsyncStorage.getItem.mockResolvedValue(savedItems)

    await removeQuestion(3)

    expect(AsyncStorage.getItem).toHaveBeenCalledWith('savedItems')
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'savedItems',
      JSON.stringify([1, 2, 4]),
    )
  })

  it('should handle errors gracefully', async () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {})
    AsyncStorage.getItem.mockRejectedValue(new Error('getItem error'))

    await expect(removeQuestion(3)).resolves.not.toThrow()

    expect(console.error).toHaveBeenCalledWith(
      'Error removing item: ',
      expect.any(Error),
    )

    consoleErrorSpy.mockRestore()
  })
})