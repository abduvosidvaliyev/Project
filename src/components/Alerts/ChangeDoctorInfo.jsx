import { HiPlus } from "react-icons/hi"
import { IoClose } from "react-icons/io5"
import { RiDeleteBin5Fill } from "react-icons/ri"

import "../../style/Alert2.css"
import { useEffect, useState } from "react"
import { getUsersId, updateUser } from "../../service/fireStoreDoctorService"

const Alert2 = ({ alertShow, alertHid, userInfo, doctor }) => {

    const [Name, setName] = useState("")
    const [Number, setNumber] = useState("")
    const [Job, setJob] = useState("")
    const [Code, setCode] = useState("")
    const [Money, setMoney] = useState("")
    const [Data, setData] = useState("")

    const [usersId, setUsersId] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await getUsersId();
                setUsersId(usersData);
            } catch (error) {
                console.error("Failed to fetch users:", error);
            }
        };

        fetchUsers();
    }, []);

    const UpdateUser = async () => {
        try {
            await updateUser(usersId[userInfo.id - 1], {
                id: doctor.length,
                name: Name,
                job: Job,
                number: Number,
                code: Code,
                money: Money,
                year: Data
            });
        } catch (error) {
            console.error("Failed to update user:", error);
        }

        alertShow(false)
    };

    return (
        <div className="alert2">
            <div className="title">
                <h3>
                    Malumotlarni o'zgartirish
                </h3>
                <IoClose onClick={() => alertShow(false)} />
            </div>
            <div className="inputs">
                <input type="text" onChange={(e) => setName(e.target.value)} placeholder="Hodim ism familiyasi:" />
                <input type="text" onChange={(e) => setNumber(e.target.value)} placeholder="Telifon raqami: " />
                <input type="text" onChange={(e) => setJob(e.target.value)} placeholder="Yo'nalish" />
                <input type="text" onChange={(e) => setCode(e.target.value)} placeholder="Parol" />
                <input type="text" onChange={(e) => setMoney(e.target.value)} placeholder="Maosh" />
                <input type="date" onChange={(e) => setData(e.target.value)} placeholder="dd/mm/yyyy" />
            </div>
            <div className="buttons">
                <button
                    onClick={() => alertHid(true)}
                    style={{ background: "#ff1216" }}
                >
                    Bekor qilish <RiDeleteBin5Fill style={{ width: "25px" }} />
                </button>
                <button onClick={UpdateUser} style={{ background: "#078625" }}>O'zgartirildi <HiPlus style={{ width: "25px" }} /></button>
            </div>
        </div>
    )
}

export default Alert2