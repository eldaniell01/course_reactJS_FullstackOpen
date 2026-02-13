import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


const Header = (props) =>{
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

const Content =(props, part1, part2, part3, exercises1, exercises2, exercises3) =>{
  return(
    <div>
      <Part part={props.part1} exercises={props.exercises1}/>
      <Part part={props.part2} exercises={props.exercises2}/>
      <Part part={props.part3} exercises={props.exercises3}/>
    </div>
  )
}

const Total = (props) => {
  return(
    <div>
      <p> numero de ejercicios {props.ex1+props.ex2+props.ex3}</p>
    </div>
  )
}

const App = ()=> {
  const course = 'half satack application development'
  const part1 = 'fundamentals of react'
  const exercises1 = 10
  const part2 = 'usign props to pass data'
  const exercises2 = 7
  const part3 = 'state of a component'
  const exercises3 = 14
  return(
    <div>
      <Header course={course}></Header>
      <Content part1={part1} part2={part2} part3={part3} exercises1={exercises1} exercises2={exercises2} exercises3={exercises3}/>
      <Total ex1={exercises1} ex2={exercises2} ex3={exercises3}/>
    </div>
  )
}
export default App
