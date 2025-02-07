import "../../style/Alert4.css"
import { AiOutlineCloseCircle } from "react-icons/ai"
import { CiEdit } from "react-icons/ci"

import { useContext, useEffect, useState } from "react"
import UserContext from "../../Context/Context"
import { getUsers, updateUser } from "../../service/fireStoreDoctorService"
import { getCustomerIds } from "../../service/fireStoreCustomerService"

const Alert4 = ({ AlertHid, cusInfo }) => {

    const contextId = useContext(UserContext)

    const [users, setUsers] = useState([]);

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

    const [name, setName] = useState("")
    const [number, setNumber] = useState("")
    const [doctor, setDoctor] = useState("")

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

    // const chengeCustomer = async () => {
    //     if (name === "" && number === "" && doctor === "") {
    //         alert("Iltimos bo'sh joylarni barchasini to'diring")
    //     }
    //     else {
    //         try {
    //             await updateUser(customerIds[contextId.id], { name: name });
    //         } catch (error) {
    //             console.error("Failed to update user:", error);
    //         }
    //         contextId.setAlert4Show(false)
    //         // console.log(name, number, doctor, customerIds[cusInfo.id])            
    //     }        
    // }

    const chengeCustomer = async () => {
        if (!name || !number || !doctor) {
            alert("Iltimos, barcha maydonlarni to‘ldiring!");
            return;
        }
    
        try {
            await updateUser(cusInfo.id, { name, number, doctor });
            alert("Ma'lumotlar yangilandi!");
        } catch (error) {
            console.error("Failed to update user:", error);
        }
        contextId.setAlert4Show(false);
    };
    

    return (
        <div className="alert4">
            <div className="title">
                <h3>
                    Ma'lumotlarni o'zgartirish
                </h3>
            </div>
            <div className="editInputs">
                <input type="text" onChange={(e) => setName(e.target.value)} placeholder="Mijoz ism familyasi" />
                <input type="text" onChange={(e) => setNumber(e.target.value)} placeholder="Telifon raqami: " />
                <select name="" onChange={(e) => setDoctor(e.target.value)} className="selectDoctor">
                    <option hidden={true} value="">Doktor tanlash</option>

                    {
                        users.map(item =>
                            <option value={item.id} className="docname">{item.name}</option>
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