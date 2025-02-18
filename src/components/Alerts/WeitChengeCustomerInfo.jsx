import "../../style/Alert4.css"
import { CiEdit } from "react-icons/ci"
import { IoClose } from "react-icons/io5"
import { RiDeleteBin5Fill } from "react-icons/ri"
import { getUsers } from "../../service/fireStoreDoctorService"
import { useContext, useEffect, useState } from "react"
import UserContext from "../../Context/Context"
import { getCustomerIds, updateCustomers } from "../../service/fireStoreCustomerService"

const Alert6 = ({ alertShow, alert2Show, cusInfo }) => {

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

    const chengeCustomer = async () => {
        if (!name || !number || !doctor) {
            alert("Iltimos, barcha maydonlarni to‘ldiring!");
            return;
        }

        try {
            await updateCustomers(customerIds[cusInfo.id - 1], {
                name: name,
                doctorName: doctor
            });
        } catch (error) {
            console.error("Failed to update user:", error);
        }
        alert2Show(false)
    };

    return (
        <div className="alert2">
            <div className="title">
                <h3>
                    Ma'lumotni o'zgartirish
                </h3>
                <IoClose onClick={() => alertShow(false)} />
            </div>
            <div className="inputs">
                <input type="text" onChange={(e) => setName(e.target.value)} placeholder="Mijoz ism familiyasi:" />
                <input type="text" onChange={(e) => setNumber(e.target.value)} placeholder="Telifon raqami: " />
                <select name="" className="selectDoctor" onChange={(e) => setDoctor(e.target.value)}>
                    <option value="" hidden={true}>Doktor tanlash</option>

                    {
                        users.map(item =>
                            <option value={item.name.split(" ")[0]} className="docname">{item.name}</option>
                        )
                    }
                </select>
            </div>
            <div className="buttons">
                <button
                    onClick={() => alert2Show(false)}
                    style={{ background: "#ff1216" }}
                >
                    Bekor qilish
                    <RiDeleteBin5Fill
                        style={{ width: "25px" }}
                    />
                </button>
                <button
                    onClick={chengeCustomer}
                    style={{ background: "#5f53fe" }}
                >
                    O'zgartirish
                    <CiEdit
                        style={{ width: "25px" }}
                    />
                </button>
            </div>
        </div>
    )
}

export default Alert6