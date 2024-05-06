import AsyncStorage from '@react-native-async-storage/async-storage'

//* dev mode *//
export async function clearAsyncStorage() {
  try {
    await AsyncStorage.clear()
    console.log('AsyncStorage został wyczyszczony.')
  } catch (error) {
    console.error('Błąd podczas czyszczenia AsyncStorage:', error)
  }
}

//* dev mode *//
 export const saveItemsRecursively = async index => {
  // console.warn('first')
     if (index < 100) {
       await testSaveItems(index)
       await saveItemsRecursively(index + 1) // Wywołanie rekurencyjne dla kolejnego indeksu
     }
   }

//* dev mode *//
export async function testSaveItems(index) {
  const value = 'elektronika|wzmacniacz_operacyjny|' + index

  try {
    const existingItems = await AsyncStorage.getItem('savedItems')
    let savedItems = []

    if (existingItems) {
      savedItems = JSON.parse(existingItems)
    }

    savedItems.push(value)

    await AsyncStorage.setItem('savedItems', JSON.stringify(savedItems))
    // setSaved(true)
  } catch (error) {
    console.error('Error saving item:', error)
  }
}
