import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login/Login"
import HomePage from "./components/HomePage/HomePage"
import Statistics from "./pages/Statistics/Statistics"
import Users from "./pages/Users/Users"
import Weit from "./pages/Weit/Weit"
import { useState } from "react"
import Context from "./Context/Context"

const App = () => {
  const [id, setId] = useState(Number)
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
    <Context.Provider value={{id, setId, alert4Show, setAlert4Show}}>
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