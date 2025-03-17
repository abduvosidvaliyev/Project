import "./Home.css";

import { useContext, useState } from "react";
import Weitlist from "../../components/Weitlist/Weitlist";
import Complated from "../../components/Complated/Complated";
import Navbar from "../Navbar/Navbar";

import Alert3 from "../../components/Alerts/HomeCustomerInfo";
import Profile from "../../components/Profile";
import AddCustomer from "../../components/Alerts/AddCustomer";
import { toast, ToastContainer } from "react-toastify";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiPlusCircle } from "react-icons/fi";
import { LuFilePenLine } from "react-icons/lu";

import { useProductContext } from "../../Context/ProductProvider";

const Home = () => {
    const { id, alert4Show, setAlert4Show, admins, users, custom, localCode } = useProductContext()   

    const [active, setActive] = useState("home");
    const [WeitlistShowHid, setWeitlistShowHid] = useState(true);
    const [WeitlistWidth, setWeitlistWidth] = useState("80%");
    const [CompletedShowHid, setCompletedShowHid] = useState(true);
    const [ComplatedWidth, setComplatedWidth] = useState("300px");      

    const allPeges = () => {
        setActive("home");
        setWeitlistShowHid(true);
        setCompletedShowHid(true);
        setWeitlistWidth("");
        setComplatedWidth("");
    };

    const weitlistShowHid = () => {
        setWeitlistWidth("100%");
        setActive("weitlist");
        setWeitlistShowHid(true);
        setCompletedShowHid(false);
    };

    const completedShowHid = () => {
        setComplatedWidth("100%");
        setActive("complated");
        setWeitlistShowHid(false);
        setCompletedShowHid(true);
    };

    const customerInfo = custom.find(item => item.id === id);

    const [addCustomerAlert, setAddCustomerAlert] = useState(false);

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
                position: "top-right",
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
                position: "top-right",
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
                position: "top-right",
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
                position: "top-right",
                progressClassName: "progressGreenBackground"
            }
        );
    };

    return (
        <section className="Home">
            <Navbar />
            <div className="HomeContainer">
                <nav className="HomeNavbar">
                    <div className="navbarButtons">
                        <button
                            style={{
                                border: `2px solid ${active === "home" ? "#000" : "transparent"}`,
                                color: active === "home" ? "#ee9314" : "",
                            }}
                            onClick={allPeges}
                        >
                            Barchasi
                        </button>
                        <button
                            style={{
                                border: `2px solid ${active === "weitlist" ? "#000" : "transparent"}`,
                                color: active === "weitlist" ? "#ee9314" : "",
                            }}
                            onClick={weitlistShowHid}
                        >
                            Kutayotganlar
                        </button>
                        <button
                            style={{
                                border: `2px solid ${active === "complated" ? "#000" : "transparent"}`,
                                color: active === "complated" ? "#ee9314" : "",
                            }}
                            onClick={completedShowHid}
                        >
                            Tugatilganlar
                        </button>
                    </div>
                    <Profile />
                </nav>
                <header className="weitlist">
                    {WeitlistShowHid ?
                        <Weitlist
                            addCustomer={setAddCustomerAlert}
                            alertShow={setAlert4Show}
                            width1={WeitlistWidth}
                        />
                        : ""
                    }
                    {CompletedShowHid ?
                        <Complated
                            firebaseDoctor={users}
                            firebaseAdmin={admins}
                            pinCode={localCode}
                            width2={ComplatedWidth}
                        />
                        : ""
                    }
                </header>
            </div>
            {alert4Show ?
                <Alert3
                    DelateNotify={delateNotify}
                    ChengeNotify={chengeNotify}
                    CompletedNotify={completedNotify}
                    customerInfo={customerInfo}
                />
                : ""
            }
            {addCustomerAlert ?
                <AddCustomer
                    AddCustomers={setAddCustomerAlert}
                    AddNotify={addNotify}
                    firebaseUser={users}
                    firebaseCustomer={custom}
                />
                : ""
            }
            <ToastContainer />
        </section>
    );
};

export default Home;
