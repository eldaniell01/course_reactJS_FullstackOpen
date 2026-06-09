export const Mostrar = (props) => {
    console.log(props)
    const {text, count} = props
    return(
        <p>{text}  {count}</p>
    )
}
