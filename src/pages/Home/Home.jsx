import { useContext, useEffect, useState } from "react"
import Weitlist from "../../components/Weitlist/Weitlist"
import Complated from "../../components/Complated/Complated"

import "./Home.css"

import UserContext from "../../Context/Context"

import { addCustomers, getCustomers } from "../../service/fireStoreCustomerService"
import Alert3 from "../../components/Alerts/Alert3"
import { getUsers } from "../../service/fireStoreDoctorService"
import { getAdmin } from "../../service/fireStoreAdminService"
import Profile from "../../components/Profile"
import AddCustomer from "../../components/Alerts/AddCustomer"

const Home = () => {
    const contextId = useContext(UserContext)

    const PINcode = JSON.parse(localStorage.getItem("PINcode"))

    const [FirebaseDoctor, setFirebaseDoctor] = useState([])
    const [FirebaseAdmin, setFirebaseAdmin] = useState([])
    const [FirebaseCustomer, setFirebaseCustomers] = useState([]);

    const [active, setActive] = useState("home");
    const [WeitlistShowHid, setWeitlistShowHid] = useState(true)
    const [WeitlistWidth, setWeitlistWidth] = useState("80%")
    const [CompletedShowHid, setCompletedShowHid] = useState(true)
    const [ComplatedWidth, setComplatedWidth] = useState("300px")


    const allPeges = () => {
        setActive("home")
        setWeitlistShowHid(true)
        setCompletedShowHid(true)
        setWeitlistWidth("")
        setComplatedWidth("")
    }

    const weitlistShowHid = () => {
        setWeitlistWidth("100%")
        setActive("weitlist")
        setWeitlistShowHid(true)
        setCompletedShowHid(false)
    }

    const completedShowHid = () => {
        setComplatedWidth("100%")
        setActive("complated")
        setWeitlistShowHid(false)
        setCompletedShowHid(true)
    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await getUsers();
                setFirebaseDoctor(usersData);
            } catch (error) {
                console.error("Failed to fetch users:", error);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await getAdmin();
                setFirebaseAdmin(usersData);
            } catch (error) {
                console.error("Failed to fetch users:", error);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await getCustomers();
                setFirebaseCustomers(usersData);
            } catch (error) {
                console.error("Failed to fetch users:", error);
            }
        };

        fetchUsers();
    }, []);

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await addCustomers();
                setUsers(usersData);
            } catch (error) {
                console.error("Failed to fetch users:", error);
            }
        };

        fetchUsers();
    }, []);

    const customerInfo = FirebaseCustomer.find(item => item.id === contextId.id)

    const [alertShow, setAlertShow] = useState(false)

    const [addCustomerAlert, setAddCustomerAlert] = useState(false)

    return (
        <section className="Home" >
            <nav className="HomeNavbar">
                <div className="navbarButtons">
                    <button
                        style={{
                            border: `2px solid ${active === "home" ? "#000" : "transparent"}`,
                            color: active === "home" ? "#ee9314" : ""
                        }}
                        onClick={allPeges}
                    >
                        Barchasi
                    </button>
                    <button
                        style={{
                            border: `2px solid ${active === "weitlist" ? "#000" : "transparent"}`,
                            color: active === "weitlist" ? "#ee9314" : ""
                        }}
                        onClick={weitlistShowHid}
                    >
                        Kutayotganlar
                    </button>
                    <button
                        style={{
                            border: `2px solid ${active === "complated" ? "#000" : "transparent"}`,
                            color: active === "complated" ? "#ee9314" : ""
                        }}
                        onClick={completedShowHid}
                    >
                        Tugatilganlar
                    </button>
                </div >
                <Profile />
            </nav >
            <header className="weitlist">
                {WeitlistShowHid ? <Weitlist addCustomer={setAddCustomerAlert} alertShow={contextId.setAlert4Show} width1={WeitlistWidth} /> : ""}
                {CompletedShowHid ? <Complated firebaseDoctor={FirebaseDoctor} firebaseAdmin={FirebaseAdmin} pinCode={PINcode} width2={ComplatedWidth} /> : ""}
            </header>
            {contextId.alert4Show ? <Alert3 alertShow={setAlertShow} customerInfo={customerInfo} /> : ""}
            {addCustomerAlert ? <AddCustomer addCustomer={setAddCustomerAlert} firebaseUser={FirebaseDoctor} firebaseCustomer={FirebaseCustomer} /> : ""}
        </section >
    )
}

export default Home
