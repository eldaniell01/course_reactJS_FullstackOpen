import React from 'react'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const App = () => {
  const [counter, setCouter] = useState(0)
  setTimeout(
    ()=> setCouter(counter+1),
    1000
  )
  console.log('rendering... ', counter)
  return(
    <div>{counter} </div>
  )
}


/*
const Header = (props) =>{
  console.log(props)
  return(
    <header>
      {props.course}
    </header>
  )
}

const Part = (props) =>{
  return(
    <p>{props.part} {props.exercises}</p>
  )
}

const Content =(props, parts) =>{
  console.log(parts)
  return(
    <div>
      <Part part={props.parts[0]['name']} exercises={props.parts[0]['exercises']}/>
      <Part part={props.parts[1]['name']} exercises={props.parts[1]['exercises']}/>
      <Part part={props.parts[2]['name']} exercises={props.parts[2]['exercises']}/>
    </div>
  )
}

const Total = (props, parts) => {
  var t = 0
  for (let index = 0; index < props.parts.length; index++) {
    const element = props.parts[index]['exercises'];
    t += element
  }
  console.log(t)
  return(
    <div>
      <p> numero de ejercicios {t}</p>
    </div>
  )
}

const Hello = ({name, age})=>{
  const bornYear = ()=> new Date().getFullYear()-age
  return(
    <div>
      <p>
        hello {name}, you are {age} years old
      </p>
      <p>so you were probably born in {bornYear()} </p>
    </div>
  )
}
*/

//const App = (props)=> {
  /*const course = {
    name: 'half satack application development',
    parts: [
      {
        name: 'fundamentals of react',
        exercises: 10
      },
      {
        name: 'usign props to pass data',
        exercises: 7
      },
      {
        name: 'state of a component',
        exercises: 14
      }
    ]
  }
  */ 
 //const name = 'perez'
 //const age = 10
 
 //const  {counter} = props
 // return(
     {/*<div>
      {/* <Header course={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total parts={course.parts}/> 
      {/*<h1>greetings</h1>
      <Hello name='maya' age={26 +10}/>
      <Hello name={name} age={age}/>
      {counter}
    </div>*/}
//  )
//}
export default App
