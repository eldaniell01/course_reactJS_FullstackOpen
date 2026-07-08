import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Numeros } from './components/Numeros'
import { PersonForm } from './components/FormPerson'
import { Filter } from './components/Filter'
import axios from 'axios'
import phonebookServices from './services/phonebookServices'

const App=()=> {
  const [persons, setPersons] = useState([])
  const [newName, setNewName]= useState('')
  const [newPhone, setNewPhone] = useState('')
  const [search, setSearch] = useState('')

  const hook = ()=>{
    phonebookServices
        .getAll()
        .then(initialData =>{
          setPersons(initialData)
        })
  }
  useEffect(hook, [])

  const addName = (event)=>{
    event.preventDefault()
    const nameObject ={
      name: newName,
      number: newPhone
    }
    const existe = persons.some(persona => persona.name === nameObject.name || persona.number === nameObject.number)
    if(existe){
      console.log(existe)
      const res = window.confirm(nameObject.name + 'ya existe... quiere cambiar el numero de telenofo')
      const person = persons.find(p=>p.name === nameObject.name)
      console.log(person.id)
      if(res){
        phonebookServices
          .update(person.id, nameObject)
          .then(returnPerson =>{
            setPersons(persons.map(per => per.id === person.id ? returnPerson : per))
          })
      }
      else{
        console.log('no se agrego el dato')
      }
    }else{
      /*phonebookServices
        .create(nameObject)
        .then(returnPerson=>{
          setPersons(persons.concat(returnPerson))
          setNewName('')
          setNewPhone('')
        })
        .catch(error => {
          alert('hay un error '+error)
        })*/
    }
  }
  const deleteP = id =>{
    console.log(id)
    const res = window.confirm('estas seguro de eliminar esto')
    if (res){
      phonebookServices
        .deletePerson(id)
        .then(response =>{
          alert('eliminado')
          setPersons(persons => persons.filter(person => person.id!==id))
          
        })
    }
    
  }
  const handleChangeInput = (event) => {
    setNewName(event.target.value)
  }
  const handleChangeInputNumber = (event) => {
    setNewPhone(event.target.value)
  }
  const handleChangeSearch = (event) =>{
    setSearch(event.target.value)
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
          {filterText.map(numero => <Numeros key={numero.id} persona={numero} deleteP={()=>deleteP(numero.id)}/>)}
        </ul>
      }
    </>
  )
}

export default App
