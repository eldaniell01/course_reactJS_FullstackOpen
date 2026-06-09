import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Button } from './Button'
import { Mostrar } from './Vista'


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const [stadistics, setStadistics] = useState({
    good:0, neutral:0, bad:0, total: 0, average: 0.0, positive: 0.0
  })

  const handleGood = () =>{
    const bueno = stadistics.good+1
    const t = stadistics.total+1
    const promedio = t/3
    const positivo = (bueno/t)*100
    setStadistics({...stadistics, good:bueno, total: t, average: promedio, positive: positivo})
  }
  
  const handleNeutral = () =>{
    const t = stadistics.total+1
    const promedio = t/3
    const positivo = (stadistics.good/t)*100
    setStadistics({...stadistics, neutral:stadistics.neutral+1, total: t, average: promedio, positive: positivo})
  }
  const handleBad = () =>{
    const t = stadistics.total+1
    const promedio = t/3
    const positivo = (stadistics.good/t)*100
    setStadistics({...stadistics, bad:stadistics.bad+1, total: t, average: promedio, positive: positivo})
  }

  const handleReset = () =>{

  }

  return (
    <>
      <h1>Dar Opinion</h1>
      <Button onClick={handleGood} text={'BUENO'}/>
      <Button onClick={handleNeutral} text={'NEUTRAL'}/>
      <Button onClick={handleBad} text={'MALO'}/>
      <h1>Estadisticas</h1>
      {stadistics.good || stadistics.neutral || stadistics.bad ?(
          <div>
            <Mostrar text={'BUENO'} count={stadistics.good}/>
            <Mostrar text={'NEUTRAL'} count={stadistics.neutral}/>
            <Mostrar text={'MALO'} count={stadistics.bad}/>
            <Mostrar text={'TOTAL'} count={stadistics.total}/>
            <Mostrar text={'PROMEDIO'} count={stadistics.average}/>
            <Mostrar text={'PORCENTAJE POSITIVO'} count={stadistics.positive}/>
            <button onClick={handleReset}>REINICIAR</button>
          </div>
      ): (
        <p>no hay datos</p>
      )}
      
    </>
  )
}

export default App
