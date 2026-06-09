import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Anecdota } from './Anecdota'

const App= ()=> {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  

  const [num, setSelected] = useState({
    selected:0, 0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0
  })

  const {selected, ...nums} = num

  const random = ()=>{
    const random = Math.floor(Math.random()*anecdotes.length)
    setSelected({...num, selected: random} )
  }
  const handleVoto=()=>{
    const edit = num.selected
    const voto = num[edit] +1
    setSelected({...num, [edit]:voto})
    console.log(num)
  }

  const clave = Object.keys(nums).reduce((a,b)=> nums[a]>nums[b]?a:b)
  console.log('este es el mayor', clave)
  return (
    <>
      <h1>ANECDOTA DEL DIA</h1>
      <div>
        <Anecdota anec={anecdotes[num.selected]} votos={num[num.selected]}/>
        <button onClick={handleVoto} >votar</button>
      </div>
      <button onClick={random} >MOSTRAR ANECDOTA</button>
      <h1>ANECDOTA MAS VOTADA</h1>
      <Anecdota anec={anecdotes[clave]} votos={num[clave]}/>
    </>
  )
}

export default App
