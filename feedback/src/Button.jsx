export const Button = (props) => {
    console.log(props)
    const {onClick, text} = props
    return(
        <div>
            <button onClick={onClick}>{text}</button>
        </div>
        
    )
}
