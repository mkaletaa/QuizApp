export function removeUnderscores(str: string, capitalizeFirstLetter=false): string {
  let modifiedStr = str

  if (str.endsWith('__All__')) {
    modifiedStr = str.replace('__All__', '')
    modifiedStr += ' - all topics'
  }

  modifiedStr = modifiedStr.replace(/_/g, ' ')

  if(capitalizeFirstLetter){
   modifiedStr = modifiedStr.charAt(0).toUpperCase() + modifiedStr.slice(1)
  }

  return modifiedStr
}
