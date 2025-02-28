import "../../style/Alert3.css"
import { useContext, useEffect, useState } from "react"
import { CiEdit } from "react-icons/ci"
import { IoClose } from "react-icons/io5"
import { MdLibraryAddCheck } from "react-icons/md"
import { RiDeleteBin5Fill } from "react-icons/ri"
import Alert4 from "./ChengeCustomerInfo"
import { subscribeToCustomerIds, updateCustomers } from "../../service/fireStoreCustomerService"
import UserContext from "../../Context/Context"

const Alert3 = ({ customerInfo, DelateNotify, ChengeNotify, CompletedNotify }) => {
    const [alertHid, setAlertHid] = useState(true)

    const { setAlert4Show } = useContext(UserContext);

    const [deleteOpacity, setDeleteOpacity] = useState(0)
    const [deleteScale, setDeleteScale] = useState(0.8)
    const [deleteEvent, setDeleteEvent] = useState("none")
    const [alertEvent, setAlertEvent] = useState("all")

    const deleteAlert = () => {
        setDeleteOpacity(1)
        setDeleteScale(1)
        setDeleteEvent("all")
        setAlertEvent("none")
    }

    const [customerIds, setCustomerIds] = useState([]);

    // **Mijozlarni olish (real vaqt rejimi)**
    useEffect(() => {
        const unsubscribe = subscribeToCustomerIds(setCustomerIds);
        return () => unsubscribe();
    }, []);

    const delateCustomer = async () => {
        
        setAlert4Show(false);
        DelateNotify()

        try {
            const customerId = customerInfo.id - 1;
            await updateCustomers(customerIds[customerId], { delate: false });
        } catch (error) {
            console.error("Failed to update user:", error);
        }

    };

    const complatedCustomer = async () => {
        setAlert4Show(false);
        CompletedNotify()
        try {
            const customerId = customerInfo.id - 1;
            await updateCustomers(customerIds[customerId], { complated: false });
        } catch (error) {
            console.error("Failed to update user:", error);
        }
    };

    const deleteAlertHidden = () => {
        setDeleteOpacity(0)
        setDeleteScale(0.8)
        setDeleteEvent("none")
        setAlertEvent("all")
    }

    const formatDate = (timestamp) => {
        if (timestamp?.seconds) {
            const date = new Date(timestamp.seconds * 1000);
            return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        }
        return "Noma'lum";
    };

    return (
        <div className="alertContainer">
            {
                alertHid ? (
                    <div className="alert" style={{ pointerEvents: alertEvent }}>
                        <div className="title">
                            <h3>Mijoz holati</h3>
                            <IoClose onClick={() => setAlert4Show(false)} />
                        </div>
                        <div className="userInfo">
                            <h3>Id: {customerInfo.id || "No'malum"}</h3>
                            <h3>Mijoz: {customerInfo.name || "No'malum"}</h3>
                            <h3>Doktor: {customerInfo.doctorName || "No'malum"}</h3>
                            <h3>Tel: {customerInfo.number || "No'malum"}</h3>
                            <h3>Qachon ro'yhatdan o'tgan: {formatDate(customerInfo.createdAt) || "No'malum"}</h3>
                            <h3>Bundan oldingi mijozlar soni: {customerInfo.id ? customerInfo.id - 1 : 0}</h3>
                        </div>
                        <div className="buttons">
                            <button
                                onClick={deleteAlert}
                                style={{ background: "#ff1216" }}
                            >
                                O'chirish <RiDeleteBin5Fill />
                            </button>

                            <button onClick={() => setAlertHid(false)} style={{ background: "#5f53fe" }}>O'zgartirish <CiEdit /></button>

                            <button onClick={complatedCustomer} style={{ background: "#078625" }}>Tugatish <MdLibraryAddCheck /></button>
                        </div>

                        <div className="userDelete" style={{ opacity: deleteOpacity, transform: `scale(${deleteScale})`, pointerEvents: deleteEvent }}>
                            <h3>
                                Rostdanham bu mijozni o'chirmoqchimisiz?
                            </h3>

                            <div className="deleteButton">
                                <button onClick={delateCustomer}>Ha</button>
                                <button onClick={deleteAlertHidden}>Yo'q</button>
                            </div>
                        </div>
                    </div>
                ) : <Alert4 chengeNotify={ChengeNotify} cusInfo={customerInfo} AlertHid={setAlertHid} />
            }
        </div>
    )
}

export default Alert3;
