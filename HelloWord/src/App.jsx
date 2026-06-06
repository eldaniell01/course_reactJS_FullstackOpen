import { useState } from 'react'

import viteLogo from '/vite.svg'


function App() {
  const now = new Date()
  const a = 10
  const b = 20
  console.log(now, a+b)

  return (
    <>
      <p>Hello World, it is now {now.toString()}</p>
      <p>
        {a}+{b}={a+b}
      </p>
    </>
  )
}

export default App
