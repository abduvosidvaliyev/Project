import "./Users.css"
import Navbar from '../Navbar/Navbar'
import { useEffect, useState } from "react"
import { FaSearch } from "react-icons/fa"
import { HiPlus } from "react-icons/hi"
import { BsFillGrid3X3GapFill, BsGridFill } from "react-icons/bs"
import { TfiLayoutGrid4Alt } from "react-icons/tfi"
import Alert1 from "../../components/Alerts/DoctorInfo"
import { getUsers } from "../../service/fireStoreDoctorService"
import Profile from "../../components/Profile"
import AddUser from "../../components/Alerts/AddUser"
import { subscribeToAdmins } from "../../service/fireStoreAdminService"
import { subscribeToCustomers } from "../../service/fireStoreCustomerService"
import { toast, ToastContainer } from "react-toastify"
import { FiPlusCircle } from "react-icons/fi"
import { LuFilePenLine } from "react-icons/lu"
import { RiDeleteBin6Line } from "react-icons/ri"

const Users = () => {
    const [doctor, setUsers] = useState([]);
    const [FirebaseAdmin, setFirebaseAdmin] = useState([])
    const [FirebaseCustomers, setFirebaseCustomers] = useState([])

    const PINcode = JSON.parse(localStorage.getItem("PINcode"))

    useEffect(() => {
        const unsubscribe = getUsers(setUsers);
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const unsubscribe = subscribeToCustomers(setFirebaseCustomers);
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const unsubscribe = subscribeToAdmins(setFirebaseAdmin);
        return () => unsubscribe();
    }, []);

    const [CardWidth, setCardWidth] = useState("32%")
    const [CardContent, setCardContent] = useState("flex-start")
    const [InfoDisplay, setInfoDisplay] = useState("block")
    const [WeitlistGap, setWeitlistGap] = useState("20px")
    const [CardDirection, setCardDirection] = useState("row")

    const uchtalik = () => {
        setCardWidth("32%")
        setCardContent("flex-start")
        setInfoDisplay("block")
        setWeitlistGap("20px")
        setCardDirection("row")
    }

    const torttalik = () => {
        setCardWidth("24%")
        setCardContent("flex-start")
        setWeitlistGap("15px")
        setInfoDisplay("block")
        setCardDirection("row")
    }

    const beshtalik = () => {
        setCardWidth("20%")
        setCardContent("center")
        setInfoDisplay("flex")
        setWeitlistGap("20px")
        setCardDirection("column")
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

    const alertInformation = (name) => {
        setAlertShow(true)
        let information = doctor.find(item => item.name === name)
        setUserInformation(information)
    }

    const [addUser, setAddUser] = useState(false)

    const delateNotify = () => {
        toast.success(
            <div className="flex items-center justify-between w-full">
                <RiDeleteBin6Line size={25} color="#ff0000" />
                <span className="text-xl" style={{ color: "#ff0000" }}>O‘chirildi!</span>
            </div>,
            {
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                closeButton: false,
                icon: false,
                position: "bottom-right",
                progressClassName: "progressRedBackground"
            }
        );
    };

    const addNotify = () => {
        toast.success(
            <div className="flex items-center justify-between w-full">
                <FiPlusCircle size={25} color="#078625" />
                <span className="text-xl" style={{ color: "#078625" }}>Qo‘shildi!</span>
            </div>,
            {
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                closeButton: false,
                icon: false,
                position: "bottom-right",
                progressClassName: "progressGreenBackground"
            }
        );
    };

    const chengeNotify = () => {
        toast.success(
            <div className="flex items-center justify-between w-full">
                <LuFilePenLine size={25} color="#5f54fe" />
                <span className="text-xl" style={{ color: "#5f54fe" }}>O‘zgartirildi!</span>
            </div>,
            {
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                closeButton: false,
                icon: false,
                position: "bottom-right",
                progressClassName: "progressBlueBackground"
            }
        );
    };

    const completedNotify = () => {
        toast.success(
            <div className="flex items-center justify-between w-full">
                <FiPlusCircle size={25} color="#078625" />
                <span className="text-xl" style={{ color: "#078625" }}>Tugatildi!</span>
            </div>,
            {
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                closeButton: false,
                icon: false,
                position: "bottom-right",
                progressClassName: "progressGreenBackground"
            }
        );
    };

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
                                    <div
                                        className="doctorCard cursor-pointer"
                                        onClick={() => alertInformation(item.name)}
                                        style={{ width: CardWidth, justifyContent: CardContent, flexDirection: CardDirection }}
                                    >
                                        <h3 className="textImg">{item.name[0]}</h3>
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
            <ToastContainer />
            {alertShow ?
                <Alert1
                    doctor={doctor}
                    alertShow={setAlertShow}
                    userInformation={userInformation}
                    DelateNotify={delateNotify}
                    ChengeNotify={chengeNotify}
                />
                : ""
            }
            {addUser ?
                <AddUser
                    Users={setUsers}
                    AddUser={setAddUser}
                    doctor={doctor}
                    AddNotify={addNotify}
                />
                : ""
            }
        </section>
    )
}

export default Users