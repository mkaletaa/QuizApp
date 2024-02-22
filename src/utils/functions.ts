import { Linking } from 'react-native'

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


  export default function sendAnEmail (arg) {
    const email = 'address@gmail.com'
    const subject = "`nazwa aplikacji` - a mistake"
    const body=arg+'\nEven heroes make mistakes. Describe what is wrong and I\'ll fix it. You can delete the body of this email excepet the first line.'


    Linking.openURL(`mailto:${email}?subject=${subject}&body=${body}`)
  }
