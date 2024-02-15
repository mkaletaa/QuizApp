
const useModifyText = () => {

  const modifyText = str => {
    let modifiedStr = str

    if (str.endsWith('__All__')) {
      modifiedStr = str.replace('__All__', '')
      modifiedStr += ' - all topics'
    }

    modifiedStr = modifiedStr.replace(/_/g, ' ')

    return modifiedStr  
  }

  return modifyText
}

export default useModifyText
