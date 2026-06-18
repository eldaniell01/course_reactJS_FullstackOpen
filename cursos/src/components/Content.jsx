export const Content = (props) => {
    const {material} = props
    const total = material.reduce((s,p)=>{
        return s+p.exercises
    },0)

    return(
        <>
            {material.map(course => <li key={course.id}>{course.name} {course.exercises}</li>)}
            <h3>El total es {total}</h3>
        </>
    )
}
