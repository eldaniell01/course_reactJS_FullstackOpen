export const Button = (props) => {
    console.log(props)
    const {onClick, text} = props
    return(
        <button onClick={onClick}>{text}</button>
    )
} 