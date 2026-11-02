import { useState, useEffect } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

import { Filter } from '../components/Filter'
import axios from 'axios'
import paisesServices from '../services/paisesServices'
import { Contry } from './components/Contry'

function App() {
  const [pais, setPaises] = useState([])
  const [search, setSearch] = useState('')
  const [mostrar, setMostrar] = useState(true)

  const hook = () =>{
    paisesServices
      .getAll()
      .then(initialData=>{
        setPaises(initialData.data)
        console.log(initialData.data)
      })
  }

  useEffect(hook, [])

  const handleChangeSearch = (event) =>{
      setSearch(event.target.value)
      console.log(search)
  }

  const onSearch = (event)=>{
    event.preventDefault()
    paisesServices
      .getAll(search)
      .then(response => {
        console.log('Respuesta de la API:', response.data)
        setPaises(response.data)
      })
      .catch(error => {
      console.log(error.response?.status)
      console.log(error.message)
    })
  }

  const filterText = pais.filter(p =>{
    const text = p.name.common.toLowerCase()
    const filterT = search.toLowerCase()
    return text.includes(filterT)
  })
  
  return (
    <>
      <h2>BUSCAR PAIS</h2>
      <div>
        <Filter value={search} onChange={handleChangeSearch}/>  
      </div>
      <pre>
        {filterText.length >= 10 ?
          (<p>hay demasiados</p>)
          :
          (<div>
            {filterText.map((p, index)=>(
              <div key={index}>
                
                <Contry
                  name={p.name.common}
                  capital={p.capital}
                  area={p.area}
                  languages={p.languages}
                  flag={p.flags}
                  mInformacion={mostrar}
                  oInformacion={setMostrar}
                />
                
              </div>
            ))}
          </div>)
        }
      </pre>
    </>
  )
}

export default App
