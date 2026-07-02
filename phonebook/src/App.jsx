import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Numeros } from './components/Numeros'
import { PersonForm } from './components/FormPerson'
import { Filter } from './components/Filter'
import axios from 'axios'

const App=()=> {
  const [persons, setPersons] = useState([])
  const [newName, setNewName]= useState('')
  const [newPhone, setNewPhone] = useState('')
  const [search, setSearch] = useState('')

  const hook = ()=>{
    axios
        .get('http://localhost:3001/persons')
        .then(response =>{
          setPersons(response.data)
        })
  }
  useEffect(hook, [])
  const handleChangeInput = (event) => {
    setNewName(event.target.value)
  }
  const handleChangeInputNumber = (event) => {
    setNewPhone(event.target.value)
  }
  const handleChangeSearch = (event) =>{
    setSearch(event.target.value)
  }

  const addName = (event)=>{
    event.preventDefault()
    const nameObject ={
      name: newName,
      number: newPhone
    }
    const existe = persons.some(persona => persona.name === nameObject.name || persona.number === nameObject.number)
    
    if(existe){
      alert(newName + ' ya existe')
    }else{
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewPhone('')
    }
  }

  const filterText = persons.filter(person =>{
    const text = person.name.toLowerCase()
    const filterT = search.toLowerCase()
    return text.includes(filterT)
  })

  return (
    <>
      <h2>Agenda</h2>
      <h3>buscar</h3>
      <div>
        <Filter value={search} 
        onChange={handleChangeSearch}
      />
      </div>
      <PersonForm 
        addName={addName} 
        newName={newName} 
        newPhone={newPhone} 
        handleChangeInput={handleChangeInput}
        handleChangeInputNumber={handleChangeInputNumber}
      />
      <h2>Numeros</h2>
      {persons.length ===0 ? 
        <p>no se ha ingresado ninguno</p>
        :
        <ul>
          {filterText.map(numero => <Numeros key={numero.id} persona={numero}/>)}
        </ul>
      }
    </>
  )
}

export default App
