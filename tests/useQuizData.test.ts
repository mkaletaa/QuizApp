// yourFunction.test.js
import useQuizData from "../src/hooks/useQuizData"

const {countItemsInTopics} = useQuizData()// Importuj funkcję do testów

describe('Your function', () => {
  test('should return the correct result', () => {
    // Przykładowe testowanie
    const result = countItemsInTopics(["top_1"], "cat_1") //

    // Oczekiwany wynik
    expect(result).toEqual(3)
  })

  // Dodaj więcej testów w miarę potrzeb
})
