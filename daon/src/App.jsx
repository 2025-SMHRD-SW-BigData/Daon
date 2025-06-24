import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import {Route, Routes} from 'react-router-dom'
import Main from './component/Main'
import Map from './component/Map'
import Join from './component/Join'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path='/' element={<Main></Main>}></Route>
      <Route path='/map' element={<Map></Map>}></Route>
      <Route path='/join' element={<Join></Join>}></Route>


    </Routes>
  )
}

export default App
