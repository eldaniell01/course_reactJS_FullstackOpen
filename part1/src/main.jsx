import { StrictMode } from 'react'
import { createRoot} from 'react-dom/client'
import ReactDom from 'react-dom/client'
import './index.css'
import App from './App.jsx'

ReactDom.createRoot(document.getElementById('root')).render(<App/>)

/*let counter = 1
const root = ReactDom.createRoot(document.getElementById('root'))
const refresh=()=>{
  root.render(
    <App counter= {counter}/>
  )
}
/*
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App counter = {counter} />
  </StrictMode>,
)*/
/*
setInterval(() => {
  refresh()
  counter += 1
}, 1000)*/
