import {
  importItem,
  importItemById,
  importItemInfinityMode,
  countItemsInTopic,
} from '../src/utils/getQuizData'
import { removeQuestion } from '../src/utils/utilStorage'

jest.mock('../src/utils/utilStorage', () => ({
  removeQuestion: jest.fn(),
}))

const mockQuiz = {
  chapter1: {
    topic1: [
      { id: 'chapter1|topic1|0', question: 'Question 1', answer: 'Answer 1' },
      { id: 'chapter1|topic1|1', question: 'Question 2', answer: 'Answer 2' },
    ],
    topic2: [],
  },
  chapter2: {
    topic1: [
      { id: 'chapter2|topic1|0', question: 'Question 3', answer: 'Answer 3' },
    ],
  },
}

jest.mock('../src/data/quiz/quizModule', () => ({
  quiz: mockQuiz,
}))

describe('Quiz Data Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('importItem should retrieve the correct item', () => {
    const chap = 'chapter1'
    const top = 'topic1'
    const whichItem = 0
    const expectedItem = mockQuiz[chap][top][whichItem]

    const result = importItem(chap, top, whichItem)
    expect(result).toEqual(expectedItem)
  })

  test('importItem should return null if item is undefined or null', () => {
    const chap = 'chapter1'
    const top = 'topic1'
    const whichItem = 999 // Assuming there are not that many items

    const result = importItem(chap, top, whichItem)
    expect(result).toBeNull()
  })

  test('importItemById should retrieve the correct item by ID', () => {
    const id = 'chapter1|topic1|1'
    const expectedItem = mockQuiz['chapter1']['topic1'].find(
      item => item.id === id
    )

    const result = importItemById(id)
    expect(result).toEqual(expectedItem)
  })

  test('importItemById should return null if item does not exist', () => {
    const id = 'invalid|id'

    const result = importItemById(id)
    expect(result).toBeNull()
    expect(removeQuestion).toHaveBeenCalledWith(id)
  })

  test('importItemInfinityMode should return a valid item from a random chapter', () => {
    const chapName = '__All__'
    const item = importItemInfinityMode(chapName)

    expect(item).toBeDefined()
    expect(item).toHaveProperty('id')
  })

  test('importItemInfinityMode should return a valid item from a specific chapter', () => {
    const chapName = 'chapter1'
    const item = importItemInfinityMode(chapName)

    expect(item).toBeDefined()
    expect(item).toHaveProperty('id')
  })

  test('countItemsInTopic should return the correct number of items', () => {
    const chapName = 'chapter1'
    const topName = 'topic1'
    const expectedCount = mockQuiz[chapName][topName].length

    const result = countItemsInTopic(topName, chapName)
    expect(result).toBe(expectedCount)
  })

  test('countItemsInTopic should return 0 if chapter or topic does not exist', () => {
    const chapName = 'invalidChapter'
    const topName = 'invalidTopic'

    const result = countItemsInTopic(topName, chapName)
    expect(result).toBe(0)
  })
})
