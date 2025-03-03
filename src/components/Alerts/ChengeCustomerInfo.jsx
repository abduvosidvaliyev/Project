import "../../style/Alert4.css"
import { AiOutlineCloseCircle } from "react-icons/ai"
import { CiEdit } from "react-icons/ci"

import { useContext, useEffect, useState } from "react"
import UserContext from "../../Context/Context"
import { getUsers } from "../../service/fireStoreDoctorService"
import { subscribeToCustomerIds, updateCustomers } from "../../service/fireStoreCustomerService"

const Alert4 = ({ AlertHid, chengeNotify, cusInfo }) => {

    const { setAlert4Show } = useContext(UserContext);

    const [users, setUsers] = useState([]);

    // **Mijozlarni olish (real vaqt rejimi)**
    useEffect(() => {
        const unsubscribe = getUsers(setUsers);
        return () => unsubscribe();
    }, []);

    const [name, setName] = useState("")
    const [number, setNumber] = useState("")
    const [doctor, setDoctor] = useState("")


    const [customerIds, setCustomerIds] = useState([]);

    useEffect(() => {
        const unsubscribe = subscribeToCustomerIds(setCustomerIds);
        return () => unsubscribe();
    }, []);

    const chengeCustomer = async () => {
        if (!name || !number || !doctor) {
            alert("Iltimos, barcha maydonlarni to‘ldiring!");
            return;
        }

        setAlert4Show(false);
        chengeNotify()

        try {
            await updateCustomers(customerIds[cusInfo.id - 1], {
                name: name,
                number: number,
                doctorName: doctor
            });
        } catch (error) {
            console.error("Failed to update user:", error);
        }
    };


    return (
        <div className="alert4">
            <div className="title">
                <h3>
                    Ma'lumotlarni o'zgartirish
                </h3>
            </div>
            <div className="editInputs">
                <input type="text" value={cusInfo.name} onChange={(e) => setName(e.target.value)} placeholder="Mijoz ism familyasi" />
                <input type="text" value={cusInfo.number} onChange={(e) => setNumber(e.target.value)} placeholder="Telefon raqami: " />
                <select name="" onChange={(e) => setDoctor(e.target.value)} className="selectDoctor">
                    <option hidden={true} value="">Doktor tanlash</option>

                    {
                        users.map(item =>
                            <option value={item.name.split(" ")[0]} className="docname">{item.name}</option>
                        )
                    }
                </select>
                <button>Kechiktirish</button>
            </div>
            <div className="buttons">
                <button
                    onClick={() => AlertHid(true)}
                    style={{ background: "#ff1216" }}>Bekor qilish
                    <AiOutlineCloseCircle style={{ width: "25px", height: "25px" }} />
                </button>
                <button
                    onClick={chengeCustomer}
                    style={{ background: "#5f53fe" }}
                >
                    O'zgartirildi <CiEdit />
                </button>
            </div>
        </div>
    )
}

export default Alert4
