import comments from './comments.json'
import conditionals from './conditionals.json'
import declaration_keywords from './declaration_keywords.json'
import functions_1 from './functions_#1.json'
import functions_2 from './functions_#2.json'
import loops from './loops.json'
import operators from './operators.json'
import variables from './variables.json'

export const fundamentals = {
  comments,
  variables,
  declaration_keywords,
  operators,
  conditionals,
  loops,
  ['functions_#1']: functions_1,
  ['functions_#2']: functions_2,
}