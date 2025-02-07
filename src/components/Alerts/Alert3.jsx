import "../../style/Alert3.css"
import { useContext, useEffect, useState } from "react"
import { CiEdit } from "react-icons/ci"
import { IoClose } from "react-icons/io5"
import { MdLibraryAddCheck } from "react-icons/md"
import { RiDeleteBin5Fill } from "react-icons/ri"
import UserContext from "../../Context/Context"
import Alert4 from "./Alert4"
import { getCustomerIds, updateCustomers } from "../../service/fireStoreCustomerService"

const Alert3 = ({ customerInfo }) => {

    const [alertHid, setAlertHid] = useState(true)

    const contextId = useContext(UserContext)

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

    useEffect(() => {
        const fetchCustomerIds = async () => {
            try {
                const ids = await getCustomerIds();
                setCustomerIds(ids);
            } catch (error) {
                console.error("Failed to fetch customer IDs:", error);
            }
        };

        fetchCustomerIds();
    }, []);

    const chengeCustomer = async () => {
        try {
            const customerId = customerInfo.id - 1;
            await updateCustomers(customerIds[customerId], { delate: false });
        } catch (error) {
            console.error("Failed to update user:", error);
        }
        contextId.setAlert4Show(false);
    };
    
    const complatedCustomer = async () => {
        try {
            const customerId = customerInfo.id - 1;
            await updateCustomers(customerIds[customerId], { complated: false, delate: true });
        } catch (error) {
            console.error("Failed to update user:", error);
        }
        contextId.setAlert4Show(false);
    };

    const deleteAlertHidden = () => {
        setDeleteOpacity(0)
        setDeleteScale(0.8)
        setDeleteEvent("none")
        setAlertEvent("all")
    }

    return (
        <div className="alertContainer">
            {
                alertHid ?
                    <div className="alert" style={{ pointerEvents: alertEvent }}>
                        <div className="title">
                            <h3>Mijoz holati</h3>
                            <IoClose onClick={() => contextId.setAlert4Show(false)} />
                        </div>
                        <div className="userInfo">
                            <h3>Id: {customerInfo.id}</h3>
                            <h3>Mijoz: {customerInfo.name}</h3>
                            <h3>Doktor: {customerInfo.doctorName}</h3>
                            <h3>Tel: </h3>
                            <h3>Qachon ro'yhatdan o'tgan: </h3>
                            <h3>Bundan oldingi mijozlar soni: {customerInfo.id}</h3>
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
                                Rostdanham bu mijozni o'chirmoqchimisiz ?
                            </h3>

                            <div className="deleteButton">
                                <button onClick={chengeCustomer}>Ha</button>
                                <button onClick={deleteAlertHidden}>Yo'q</button>
                            </div>
                        </div>
                    </div> : <Alert4 cusInfo={customerInfo} AlertHid={setAlertHid} />
            }
        </div>
    )
}

export default Alert3