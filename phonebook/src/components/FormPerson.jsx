export const PersonForm = (props) => {
    const {addName, newName, newPhone, handleChangeInput, handleChangeInputNumber} = props
    return(
        <div>
            <form onSubmit={addName}>
                <div>
                    name: <input value={newName} onChange={handleChangeInput} />
                    number: <input value={newPhone} onChange={handleChangeInputNumber} />
                </div>
                <div>
                    <button type="submit">Agregar</button>
                </div>
            </form>
        </div>
    )
}
