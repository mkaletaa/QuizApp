import { useState } from 'react'

const useResults = itemSet => {
  const [results, setResults] = useState([]) //same as results but as a state

  function isCorrect(
    itemUserChoices, //opcje danego itema, które zaznaczył user
    options //opcje konkretnego itema
  ): 'correct' | 'incorrect' | 'kindof' {
    //zwróć incorrect jeśli żaden element tablicy itemUserChoices nie ma właściwości correct: true
    //zwróć correct jeśli wszystkie elementy tablicy itemUserChoices mają właściwość correct: true i jest ich dokładnie tyle ile elementów tablicy itemUserChoices ma właściwość correct: true
    //zwróć w każdym innym przypadku

    let nrOfCorrectUserOptions = 0
    let nrOfCorrectOptions = 0

    for (const itemUserChoice of itemUserChoices) {
      if (itemUserChoice?.correct) nrOfCorrectUserOptions++
    }

    if (nrOfCorrectUserOptions === 0) return 'incorrect'

    for (const option of options) {
      if (option.correct) nrOfCorrectOptions++
    }

    if (
      nrOfCorrectUserOptions === nrOfCorrectOptions &&
      nrOfCorrectOptions === itemUserChoices.length
    )
      return 'correct'

    return 'kindof'
  }

  /* funkcja przyjmuje id itema oraz naciśniętą opcję 
(niezależnie czy została naciśnięta w celu zaznaczenia czy odznaczenia) */
  function createResultsArray(pressedOption, itemId) {
    for (let i = 0; i < itemSet.length; i++) {
      //pętla po itemSet
      if (itemSet[i].id === itemId) {
        //jeśli natrafimy na itema, którego opcja zozstała przyciśnięta

        //w przypadku pytań jednokrotnego wyboru:
        if (!itemSet[i].multiChoice) {
          //jeli nie udzielono jeszcze odpowiedzi na to pytanie, dodaj ją do arrayOfResults
          if (results[i]?.userChoices?.length === 0) {
            console.log('nie było nic jeszcze zaznaczone')

            let results2 = [...results]
            results2[i].userChoices.push(pressedOption)
            results2[i].isCorrect = isCorrect(
              results[i].userChoices,
              itemSet[i].options
            )
            setResults(results2)
          } else {
            //jeśli już coś było zaznaczone
            console.log('coś było juz zaznazone i...')
            //jeśli zaznaczono nową opcję
            if (pressedOption.isChosen) {
              console.log('...zaznaczono nową odpowiedź')

              let results2 = [...results]

              results2[i].userChoices = [pressedOption]
              results2[i].isCorrect = isCorrect(
                results[i].userChoices,
                itemSet[i].options
              )

              setResults(results2)
            } else {
              // jeśli odznaczono odpowiedź
              console.log('...odznaczono odpowiedź')
              let results2 = [...results]
              results2[i].userChoices = []
              results2[i].isCorrect = isCorrect(
                results[i].userChoices,
                itemSet[i].options
              )
              setResults(results2)
            }
          }
          return
        }

        //jeśli pytanie jest wielokrotnego wyboru:
        //jeli na pytanie nie udzielono jeszcze żadnej odpowiedzi
        if (results[i].userChoices.length === 0) {
          console.log('nie było nic jeszcze zaznaczone')

          let results2 = [...results]
          results2[i].userChoices.push(pressedOption)
          console.log('🚀 ~ compare ~ results2:', results2)
          results2[i].isCorrect = isCorrect(
            results[i].userChoices,
            itemSet[i].options
          )

          setResults(results2)
        } else {
          //jeśli już udzielono odpowiedzi
          console.log('coś było juz zaznazone i...')
          //jeśli zaznaczono nową odpowiedź
          if (pressedOption.isChosen) {
            console.log('...zaznaczono nową odpowiedź')
            let results2 = [...results]
            results2[i].userChoices.push(pressedOption)
            results2[i].isCorrect = isCorrect(
              results[i].userChoices,
              itemSet[i].options
            )

            setResults(results2)
          } else {
            //jeśli odznaczono odpowiedź
            console.log('...odznaczono odpowiedź')

            let results2 = [...results]
            results2[i].userChoices = results2[i].userChoices.filter(
              option => option.id !== pressedOption.id
            )
            results2[i].isCorrect = isCorrect(
              results[i].userChoices,
              itemSet[i].options
            )
            setResults(results2)
          }
        }

        break
      }
    }
  }

  return [results, setResults, createResultsArray]
}

export default useResults
