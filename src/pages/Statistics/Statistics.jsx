import "./Statistics.css"
import Navbar from "../Navbar/Navbar";
import Profile from "../../components/Profile";

const Statistics = () => {
    return (
        <section className="Statistics">
            <Navbar />
            <div className="statisticsContainer">
                <div className="statisticsNavbar">
                    <h3>
                        Barcha analizlar
                    </h3>
                    <Profile />
                </div>
                <div className="statistics">
                    
                </div>
            </div>
        </section>
    )
}

export default Statistics