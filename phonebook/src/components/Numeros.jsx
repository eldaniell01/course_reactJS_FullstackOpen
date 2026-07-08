export const Numeros = ({persona, deleteP}) => {
  return(
    <div>
      <li>{persona.name} {persona.number} <button onClick={deleteP}>eliminar</button></li>
      
    </div>
  )
}
