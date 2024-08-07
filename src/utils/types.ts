type Type =
  | 'Text'
  | 'CText' //centered text // use it in quiz files instead of Text
  | 'Block'
  | 'Header'
  | 'List'
  | 'ListElement'
  | 'Image'
  | 'Math'
  | 'YouTube'
  | 'Code'
  | 'Quote' //? maybe erase this
  | 'Spoiler'
  | 'Divider'
  | 'BulletPoint' //the same as ListElement

export type Component = {
  type: Type
  value?: string //it is optional due to Divider
  props?: any
  id?: string
}

export type Option = {
  id: string
  val: string
  correct?: boolean
  // props?: {}
  isMarked?: boolean
}

//type of a quiz question
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
  isCorrect: 'correct' | 'incorrect' | 'kindof' //todo: change name to status
}
