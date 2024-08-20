//* This file contains other utility functions
import { Linking } from 'react-native';



import settings from '../../data/settings.json';
// import Constants from 'expo-constants'
import { mailBody, mailSubject } from '../../data/texts';
import { COLOR } from './constants';
import { Item, Option, Result } from './types';


export function removeUnderscores(
  str: string,
  capitalizeFirstLetter = false,
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

//arg is the id of an item or the name of a topic
export function sendAnEmail(arg) {
  const appName = settings.name
  const email = 'learn.everything.app@proton.me'
  const subject = appName + mailSubject
  const body = arg + mailBody

  Linking.openURL(`mailto:${email}?subject=${subject}&body=${body}`)
}

export function setColor(result: Result): (typeof COLOR)[keyof typeof COLOR] {
  if (result.isCorrect === 'correct') return COLOR.GREEN
  if (result.isCorrect === 'incorrect') return COLOR.RED
  if (result.isCorrect === 'kindof') return COLOR.ORANGE
}

export function returnIsCorrect(
  item: Item,
  chosenOptions: Option[],
): 'correct' | 'incorrect' | 'kindof' {
  if (!chosenOptions) return null
  //zwróć incorrect jeśli żaden element tablicy itemUserChoices nie ma właściwości correct: true
  //zwróć correct jeśli wszystkie elementy tablicy itemUserChoices mają właściwość correct: true i jest ich dokładnie tyle ile elementów tablicy itemUserChoices ma właściwość correct: true
  //zwróć w każdym innym przypadku
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