type Type =
  | 'Text'
  | 'Block'
  | 'Header'
  | 'List'
  | 'ListElement'
  | 'Image'
  | 'Math'
  | 'YouTube'
  | 'Code'
  | 'Quote'

export type Component = {
  type: Type
  value: string
  props?: any
  id?: string
}

export type Option = {
  id: string
  val: string
  correct: boolean
  props?: {}
  isMarked?: boolean
}

export type Item = {
  id: string
  multiChoice?: boolean
  question: string | Array<Component>
  options: Array<Option>
  explanation?: string | Array<Component>
}

export type Topic = {
  name: string
  image: string
}

export type Topics = {
  [key: string]: Topic[]
}

export type Result = {
  id: string
  userChoices?: Option[]
  item: Item
  isCorrect: 'correct' | 'incorrect' | 'kindof'
}

//   setResults(prev => [...prev, { id: item.id, userChoices: [], item }])
