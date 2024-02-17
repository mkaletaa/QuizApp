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
      if (itemSet[i].id === itemId) {

        if (!itemSet[i].multiChoice) {
          //w przypadku pytań jednokrotnego wyboru:
          if (results[i]?.userChoices?.length === 0) {
            console.log('nie było nic jeszcze zaznaczone')
            //jeli nie udzielono jeszcze odpowiedzi na to pytanie, dodaj ją do arrayOfResults
            // results[i].userChoices.push(pressedOption)
            let results2 = [...results]
            results2[i].userChoices.push(pressedOption)
            results2[i].isCorrect = isCorrect(
              results[i].userChoices,
              itemSet[i].options
            )
            setResults(results2)
          } else {
            console.log('coś było juz zaznazone i...')

            //jeśli już ucoś było zaznaczone
            if (pressedOption.isChosen) {
              //jeśli zaznaczono inną odpowiedź
              console.log('...zaznaczono inną odpowiedź')

              // results[i].userChoices.pop() //pozbądź się starej odpowiedzi
              // results[i].userChoices.push(pressedOption) //dodaj zaktualizowaną odpowiedź
              let results2 = [...results]

              results2[i].userChoices = [pressedOption]
              results2[i].isCorrect = isCorrect(
                results[i].userChoices,
                itemSet[i].options
              )

              setResults(results2)
            } else {
              console.log('...odznaczono odpowiedź')

              //jeśli odznaczono istniejącą odpowiedź
              // results[i].userChoices.pop() //pozbądź się starej odpowiedzi
              let results2 = [...results]
              results2[i].userChoices = []
              results2[i].isCorrect = isCorrect(
                results[i].userChoices,
                itemSet[i].options
              )
              setResults(results2)
            }
          }
          // setResults(results)
          return
        }

        //jeśli pytanie jest wielokrotnego wyboru:
        if (results[i].userChoices.length === 0) {
          console.log('nie było nic jeszcze zaznaczoneeeee')
          //jeli nie udzielono jeszcze odpowiedzi na to pytanie, dodaj ją do arrayOfResults
          // results[i].userChoices.push(pressedOption)\
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
          if (pressedOption.isChosen) {
            console.log('...zaznaczono inną odpowiedź')
            let results2 = [...results]
            results2[i].userChoices.push(pressedOption)
            //jeśli zaznaczono inną odpowiedź
            results2[i].isCorrect = isCorrect(
              results[i].userChoices,
              itemSet[i].options
            )

            setResults(results2)
            // arrayOfResults[i].userChoices.filter //pozbądź się starej odpowiedzi
            // results[i].userChoices?.push(pressedOption) //dodaj zaktualizowaną odpowiedź
          } else {
            console.log('...odznaczono odpowiedź')
            //jeśli odznaczono istniejącą odpowiedź pozbądź się starej odpowiedzi
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

        // setResults(results)

        break
      }
    }
  }

  return [results, setResults, createResultsArray]
}

export default useResults
