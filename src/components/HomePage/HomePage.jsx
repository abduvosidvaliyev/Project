import { Route, Routes } from "react-router-dom"
import Navbar from "../../pages/Navbar/Navbar"
import Statistics from '../../pages/Statistics/Statistics'
import Users from '../../pages/Users/Users'
import Home from '../../pages/Home/Home'
import "./HomePage.css"

const HomePage = () => {
    return (
        <section className="HomePage">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/users" element={<Users />} />
                <Route path="/statistics" element={<Statistics />} />
            </Routes>
        </section>
    )
}

export default HomePage