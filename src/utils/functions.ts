import { Linking } from 'react-native'
import { Item, Option, Result } from './types'

export function removeUnderscores(
  str: string,
  capitalizeFirstLetter = false
): string {
  let modifiedStr = str

  if (str.endsWith('__All__')) {
    modifiedStr = str.replace('__All__', '')
    modifiedStr += ' - all topics'
  }

  modifiedStr = modifiedStr.replace(/_/g, ' ')

  if (capitalizeFirstLetter) {
    modifiedStr = modifiedStr.charAt(0).toUpperCase() + modifiedStr.slice(1)
  }

  return modifiedStr
}


  export function sendAnEmail (arg) {
    const email = 'address@gmail.com'
    const subject = "`nazwa aplikacji` - a mistake"
    const body=arg+'\nEven heroes make mistakes. Describe what is wrong and I\'ll fix it. You can delete the body of this email excepet the first line.'


    Linking.openURL(`mailto:${email}?subject=${subject}&body=${body}`)
  }


  export function setColor(result: Result): 'green' | 'red' | 'orange' {
    if (result.isCorrect === 'correct') return 'green'
    if (result.isCorrect === 'incorrect') return 'red'
    if (result.isCorrect === 'kindof') return 'orange'
  }

  
  export function returnIsCorrect(
    item: Item,
    chosenOptions: Option[]
  ): 'correct' | 'incorrect' | 'kindof' {
    if (!chosenOptions) return null
    //zwróć incorrect jeśli żaden element tablicy itemUserChoices nie ma właściwości correct: true
    //zwróć correct jeśli wszystkie elementy tablicy itemUserChoices mają właściwość correct: true i jest ich dokładnie tyle ile elementów tablicy itemUserChoices ma właściwość correct: true
    //zwróć w każdym innym przypadku
    // return
    let nrOfCorrectUserOptions = 0
    let nrOfCorrectOptions = 0

    for (const chosenOption of chosenOptions) {
      if (chosenOption?.correct) nrOfCorrectUserOptions++
    }

    if (nrOfCorrectUserOptions === 0) return 'incorrect'

    for (const option of item?.options) {
      if (option.correct) nrOfCorrectOptions++
    }

    if (
      nrOfCorrectUserOptions === nrOfCorrectOptions &&
      nrOfCorrectOptions === chosenOptions.length
    )
      return 'correct'

    return 'kindof'
  }