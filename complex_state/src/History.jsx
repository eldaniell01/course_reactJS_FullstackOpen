export const History = (props) =>{
    if(props.allClicks.length == 0){
        return (
            <div>
                la aplicacion es usado para presionar un boton
            </div>
        )
    }
    return(
        <div>
            historial de boton presionado: {props.allClicks.join(' ')}
        </div>
    )
}