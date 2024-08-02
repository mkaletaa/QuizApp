import Hello_World from './Hello_World.json'
import comments from './comments.json'
import variables from './variables.json'
import conditionals from './conditionals.json'
import loops from './loops.json'
import operators from './operators.json'
import functions from './functions.json'
import functions2 from './functions #2.json'

export const JS_fundamentals = {
  Hello_World,
  comments,
  variables,
  operators,
  conditionals,
  loops,
  functions,
  ['functions #2']: functions2,
}


//*kolejność
//Hello, World
// World, Hello
function fun() {
  console.log('Hello')
}

console.log('World')

fun()
//** inna kolejność argumentów

// What will be printed by this console.log()?
//"I am" 12 "Doe" "and I am" "John" "yo."
//"I am" "John" "Doe" "and I am" 12 "yo."
//"I am" 12 "John" "and I am" "Doe" "yo."
//"I am" "Doe" "John" "and I am" 12 "yo."
function greet(age, surname, name) {
  console.log('I am', name, surname, 'and I am', age, 'yo.')
}

greet('John', 'Doe', 12)

//**brak jednego argumentu */
//Helen, undefined
//undefined, Helen
//an Error will occur
function displayData(age, name) {
  console.log(age)
  console.log(name)
}

displayData('Helen')

//**o jeden argument za dużo */
//Jackson, Michael
//Michael, Jackson
//an Error will occur
//Michael, 40
//40, Michael
//40, Jackson
//Jackson, 40
function displayData(name, age) {
  console.log(age)
  console.log(name)
}

displayData('Michael', 'Jackson', 40) 

//* domyślne argumenty
//John, Doe, undefined
//John, 20, Doe
//John, undefined, Doe
//John, Doe, 20
//something else
function displayData(name, age = 20, surname) {
  console.log(name)
  console.log(age)
  console.log(surname)
}

displayData('John', 'Doe') 

//* brak return
//What will be printed by this console.log()?
//undefined, 8, 9, Error
function exp(b, a) {
  a ** b
}

console.log(exp(2, 3)) 

//* co po return
//John, user data
//John, user data, 30
//John, 30, user data
//user data, John, 30
//
function displayData(name, age) {
  console.log(name)
  return 'user data'
  console.log(age)
}

const data = displayData('John', 30)
console.log(data)

//**  rest parameter na pierwszym miejscu
//[], undefined, Error
function fun(a, b, c, ...rest) {
  console.log(rest)
}

fun(1, 2, 3)

//**  prawda czy fałsz:
//arguments jest tablicą
// rest parameter must be the last argument
// to co po return nie jest brane pod uwagę
// nie wiem co jeszcze


//**powtarzające się argumenty
//1, 2, Error
function fun(b, b) {
  console.log(b)
}

fun(1, 2)


//** scope */


//! ----------------------------------------------------------------


//*hoisting
//Will this code print 'Hello World'?
//yes, no
console.log(myFun())

function myFun() {
  return 'Hello World'
}

//******** */
//no, yes
console.log(fun())

const fun = function () {
  return 'Hello World'
}

//** */
//no, yes
const fun = function myFun() {
  return 'Hello World'
}

console.log(myFun())

//* true or false
//  if an arrow function takes no arguments you can abandon parenthesis
// all arrow functions are anonymous functions
// an arrow function is created with '->' symbol
// arrow function is the only type of function that can be used as an argument of another function


//* ------
//This is an example of...
//function expression
//anonymous function
//function declaration
//arrow function
const fun = function () {
  return 'Hello World'
}