import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { FiPieChart, FiUsers } from "react-icons/fi";
import { BiHomeAlt } from "react-icons/bi";
import { subscribeToAdmins } from "../../service/fireStoreAdminService";
import { useEffect, useState } from "react";
import { GoHourglass } from "react-icons/go";

const Navbar = () => {
    const PINcode = JSON.parse(localStorage.getItem("PINcode"))
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const unsubscribe = subscribeToAdmins(setUsers);
        return () => unsubscribe();
    }, []);

    const user = users.find((item) => item.code === PINcode);

    return (
        <section className="Navbar">
            <div className="logo w-14 h-14 flex justify-center items-center rounded-full" style={{ background: "#ccc" }}>
                <h5>Logo</h5>
            </div>
            <NavLink to="/" className={({ isActive }) => (isActive ? "active-link" : "")}>
                <BiHomeAlt style={{ width: "30px", height: "30px" }} />
            </NavLink>
            <NavLink to="/weit" className={({ isActive }) => (isActive ? "active-link" : "")}>
                <GoHourglass style={{ width: "30px", height: "30px" }} />
            </NavLink>
            {user && user.code === PINcode && (
                <NavLink to="/users" className={({ isActive }) => (isActive ? "active-link" : "")}>
                    <FiUsers />
                </NavLink>
            )}
            <NavLink to="/statistics" className={({ isActive }) => (isActive ? "active-link" : "")}>
                <FiPieChart />
            </NavLink>
        </section>
    );
};

export default Navbar;
