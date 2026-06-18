import { Content } from "./Content"

export const Curso = (props) => {
const {course} = props
console.log(course.name)
return(
    <>
        {course.map(courses =>(
            <div>
                <h1>{courses.name}</h1>
                <ul>
                    <Content material={courses.parts}/>
                </ul>
            </div>
        ))}
    </>
    )  
}
