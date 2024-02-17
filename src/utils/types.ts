export type Component = {
  componentType: string
  value: string
}

export type Option = {
  id: string
  answer: string
  correct: boolean
  componentType?: 'Text' | 'Math' 
  props?: {} | undefined
  isChosen?: boolean 
}

export type Item = {
  id: string
  multiChoice: boolean
  question: string | Array<Component>
  options: Array<Option>
  explanation: string | Array<Component>
}
