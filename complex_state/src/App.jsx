import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { History } from './History'
import { Button } from './Button'

const App = ()=>{
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  //manejador de arreglos
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)
  const handleLeftCLick = ()=>{
    setAll(allClicks.concat('L'))
    const updateLeft=left+1
    setLeft(updateLeft)
    setTotal(updateLeft+right)
  }
  const handleRightCLick = ()=>{
    setAll(allClicks.concat('R'))
    const updateRight=right+1
    setRight(updateRight)
    setTotal(updateRight+left)
  }
  
  //un usestate para varios estados
  // const [clicks, setClicks] = useState({left: 0, right: 0})
  // const handleLeftCLick = ()=>{
  //   const newClicks = {
  //     left: clicks.left +1,
  //     right: clicks.right
  //   }
  //   setClicks(newClicks)
  // }

  // const handleRightCLick = ()=>{
  //   const newClicks = {
  //     left: clicks.left,
  //     right: clicks.right +1
  //   }
  //   setClicks(newClicks)
  // }

  //uso de los ... o propagacion dentro de los manejadores de eventos
  // const [clicks, setClicks] = useState({left: 0, right: 0})
  // const handleLeftCLick = ()=> setClicks({...clicks, left: clicks.left +1})
  

  // const handleRightCLick = ()=> setClicks({...clicks, right: clicks.right +1})
  
  return(
    <div>
      {left}
      <Button onClick={handleLeftCLick} text={'left'}/>
      <Button onClick={handleRightCLick} text={'right'}/>
      {right}
      <History allClicks={allClicks}/>

    </div>
  )
}
export default App
