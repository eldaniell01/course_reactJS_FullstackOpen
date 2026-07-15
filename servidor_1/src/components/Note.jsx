export const Note = ({note, toggleImportance}) => {
  const label = note.important ? 'importante': 'no importante'
  return(
    <li className="note">
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}