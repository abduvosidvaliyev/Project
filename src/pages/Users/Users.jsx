import "./Users.css"
import Navbar from '../Navbar/Navbar'
import { useEffect, useState } from "react"
import { FaSearch } from "react-icons/fa"
import { HiPlus } from "react-icons/hi"
import { BsFillGrid3X3GapFill, BsGridFill } from "react-icons/bs"
import { TfiLayoutGrid4Alt } from "react-icons/tfi"
import Alert1 from "../../components/Alerts/Alert1"
import { getUsers } from "../../service/fireStoreDoctorService"
import Profile from "../../components/Profile"
import AddUser from "../../components/Alerts/AddUser"
import { getAdmin } from "../../service/fireStoreAdminService"
import { getCustomers } from "../../service/fireStoreCustomerService"

const Users = () => {
    const [doctor, setUsers] = useState([]);
    const [FirebaseAdmin, setFirebaseAdmin] = useState([])
    const [FirebaseCustomers, setFirebaseCustomers] = useState([])

    const PINcode = JSON.parse(localStorage.getItem("PINcode"))

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await getUsers();
                setUsers(usersData);
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

    const [CardWidth, setCardWidth] = useState("32%")
    const [CardContent, setCardContent] = useState("flex-start")
    const [InfoDisplay, setInfoDisplay] = useState("block")
    const [WeitlistGap, setWeitlistGap] = useState("20px")

    const uchtalik = () => {
        setCardWidth("32%")
        setCardContent("flex-start")
        setInfoDisplay("block")
        setWeitlistGap("20px")
    }

    const torttalik = () => {
        setCardWidth("24%")
        setCardContent("flex-start")
        setWeitlistGap("15px")
        setInfoDisplay("block")
    }

    const beshtalik = () => {
        setCardWidth("20%")
        setCardContent("center")
        setInfoDisplay("flex")
        setWeitlistGap("20px")
    }

    const [sortedDoctors, setSortedDoctors] = useState([]);

    useEffect(() => {
        setSortedDoctors(doctor);
    }, [doctor]);

    const alphaFilter = (e) => {
        const value = e.target.value;
        if (value === "alifbo") {
            setSortedDoctors([...doctor].sort((a, b) => a.name.localeCompare(b.name)));
        }
        else if (value === "tes") {
            setSortedDoctors([...doctor].sort((a, b) => b.name.localeCompare(a.name)));
        }
        else if (value === "yil") {
            setSortedDoctors(doctor);
        }
    };

    const [searchTerm, setSearchTerm] = useState("")

    const [alertShow, setAlertShow] = useState(false)
    const [userInformation, setUserInformation] = useState([])

    const alertInformation = (id) => {
        setAlertShow(true)
        const information = doctor.find(item => item.id === id)
        setUserInformation(information)
    }

    const [addUser, setAddUser] = useState(false)

    return (
        <section className="usersPage">
            <Navbar />
            <div className="userContainer">
                <div className="userNav">
                    <h3>
                        Barcha hodimlar: {doctor.length}
                    </h3>
                    <Profile />
                </div>
                <div className="userShow">
                    <nav className="WeitlistNavbar">
                        <div className="employeePlus">
                            <button onClick={() => setAddUser(true)}>
                                Hodim qo'shish
                                <HiPlus />
                            </button>
                            <div className="DoctorFilter">
                                <BsGridFill onClick={uchtalik} />
                                <BsFillGrid3X3GapFill onClick={torttalik} />
                                <TfiLayoutGrid4Alt onClick={beshtalik} />
                            </div>
                        </div>
                        <div className="employeeFilter">
                            <select className="hid cursor-pointer" onChange={(e) => alphaFilter(e)}>
                                <option value="" hidden={true}>Tartiblash</option>
                                <option value="alifbo">Alifbo</option>
                                <option value="tes">Teskari alifbo</option>
                                <option value="yil">Ishlash yili</option>
                            </select>
                            <select className="hid cursor-pointer">
                                <option value="" hidden={true}>Ishlash vaqti</option>
                                <option value="ish">Toliq ish</option>
                                <option value="stavka">Yarim stavka</option>
                                <option value="tun">Tungi</option>
                                <option value="kun">Kunduzgi</option>
                            </select>
                            <label className="search">
                                <FaSearch />
                                <input type="text" onChange={(e) => setSearchTerm(e.target.value.toLowerCase())} placeholder="Qidiruv" />
                            </label>
                        </div>
                    </nav>
                    <div className="Cards">
                        {
                            sortedDoctors.filter(item => item.delate && item.name.toLowerCase().includes(searchTerm))
                                .map(item =>
                                    <div className="doctorCard cursor-pointer" onClick={() => alertInformation(item.id)} style={{ width: CardWidth, justifyContent: CardContent, }}>
                                        {
                                            item.images === "" ? <h3 className="textImg">{item.name[0]}</h3>
                                                : <img className="userImg" src={item.images} alt="" />
                                        }
                                        <div className="info" style={{ display: InfoDisplay }}>
                                            <h2>
                                                {item.name}
                                            </h2>
                                            <h4>
                                                {item.job}
                                            </h4>
                                        </div>
                                    </div>
                                )
                        }
                    </div>
                </div>
            </div>
            {alertShow ? <Alert1 alertShow={setAlertShow} userInformation={userInformation} /> : ""}
            {addUser ? <AddUser Users={setUsers} AddUser={setAddUser} doctor={doctor}/> : ""}
        </section>
    )
}

export default Users