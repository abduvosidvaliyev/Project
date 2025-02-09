import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login/Login"
import HomePage from "./components/HomePage/HomePage"
import Context from './Context/Context'
import React, { useContext, useState } from "react"
import Statistics from "./pages/Statistics/Statistics"
import Users from "./pages/Users/Users"
import Weit from "./pages/Weit/Weit"

const App = () => {
  const ContextJs = React.createContext()

  const [id, setID] = useState(Number)
  const [alert4Show, setAlert4Show] = useState(false)

  const localCode = localStorage.getItem("PINcode")
  const localName = localStorage.getItem("UserName")

  let array = ""

  if (localCode && localName) {
    array = <HomePage />
  } else {
    array = <Login />
  }




  return (
    <Context.Provider value={{ id, setID, alert4Show, setAlert4Show }}>
      <Routes>
        <Route path="/" element={array} />
        <Route path="/weit" element={<Weit />} />
        <Route path="/users" element={<Users />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
    </Context.Provider>
  )
}

export default App