import { useState } from 'react'
import { Hello } from './Hello'
import { Display } from './Display'
import { Button } from './Button'

const App = ()=> {
  const [counter, setCounter] = useState(0)
  console.log('rendering with counter value', counter)
  const increaseByOne = ()=> {
    console.log('increasing, value before', counter)
    setCounter(counter+1)
  }
  const decreaseByOne = () => {
    console.log('decreasing value before', counter)
    setCounter(counter-1)
  }
  const setToZero = ()=> {
    console.log('resetting to zero, value before', counter)
    setCounter(0)
  }
  
  return (
    <>
      <Display counter={counter}/>
      <Button onClick={increaseByOne} text='sumar'/>
      <Button onClick={decreaseByOne} text='restar'/>
      <Button onClick={setToZero} text='reiniciar'/>
    </>
  )
}

export default App
