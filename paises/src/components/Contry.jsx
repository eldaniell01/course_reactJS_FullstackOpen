export const Contry = ({name, capital, area, languages, flag, mInformacion, oInformacion}) => {
    
    const infoMostrar = () =>{
        oInformacion(prev => !prev)
    }
    
    return(
        <>
        <h1> {name} </h1>
        {mInformacion ? 
            <button onClick={infoMostrar}>{mInformacion ? "Mostrar":"ocultar"}</button>
            :
            <>
            <div>
                <h4> Capital: {capital} </h4>
                <h4> Area: {area} </h4>
            </div>
            <div>
                <h1>Idiomas</h1>
                <ul>
                {Object.values(languages||{}).map((idioma, index)=>{
                    return <li key={index}>{idioma}</li>
                })}
                </ul>
                <img src={flag.png} alt="" srcset="" />
            </div>
            <button onClick={infoMostrar}>{mInformacion ? "Mostrar":"ocultar"}</button>
            </>
        }
        </>
    )
}