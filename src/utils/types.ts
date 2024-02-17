export type Component = {
  componentType: string
  value: string
  props?:any
}

export type Option = {
  id: string
  answer: string
  correct: boolean
  componentType?: 'Text' | 'Math' 
  props?: {} 
  isChosen?: boolean 
}

export type Item = {
  id: string
  multiChoice: boolean
  question: string | Array<Component>
  options: Array<Option>
  explanation: string | Array<Component>
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
    userChoices: Option[]
    item: Item
    isCorrect: 'correct' | 'incorrect' | 'kindof'
}

    //   setResults(prev => [...prev, { id: item.id, userChoices: [], item }])
