import "../../style/AddUser.css"
import { IoClose } from "react-icons/io5"
import { MdLibraryAddCheck } from "react-icons/md"
import { RiDeleteBin5Fill } from "react-icons/ri"
import { addUser } from "../../service/fireStoreDoctorService"
import { useState } from "react"

const AddUser = ({ AddUser, doctor }) => {

    const [userName, setUserName] = useState("")
    const [userJob, setUserJob] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [code, setCode] = useState("")
    const [userMoney, setUserMoney] = useState("")
    const [userYear, setUserYear] = useState("")

    async function AddCustomer() {
        if (!userName || !userJob || !phoneNumber || !code || !userMoney || !userYear) {
            alert("Barcha joylarni to'ldiring")
            return
        }

        try {
            await addUser({
                id: doctor.length + 1,
                name: userName,
                job: userJob,
                number: phoneNumber,
                delate: true,
                complated: true,
                code: code,
                money: userMoney,
                year: userYear,
                createdAt: new Date()
            })
        } catch (error) {
            console.error("Failed to add user:", error)
        }

        addUser(false)
    }

    return (
        <div className="customerContainer">
            <div className="addUser">
                <div className="title">
                    <h3>
                        Hodim Qo'shish
                    </h3>
                    <IoClose onClick={() => AddUser(false)} />
                </div>
                <div className="input">
                    <input type="text" onChange={(e) => setUserName(e.target.value)} placeholder="Hodim ism familiyasi:" />
                    <input type="text" onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Tel raqam:" />
                    <input type="text" onChange={(e) => setUserJob(e.target.value)} placeholder="Yo'nalishi:" />
                    <input type="text" onChange={(e) => setCode(e.target.value)} placeholder="Parol:" />
                    <input type="text" onChange={(e) => setUserMoney(e.target.value)} placeholder="Oylik:" />
                    <input type="date" onChange={(e) => setUserYear(e.target.value)} />
                </div>
                <div className="customerButtons">
                    <button
                        onClick={() => addUser(false)}
                        style={{ background: "#ff1216" }}
                    >
                        Bekor qilish <RiDeleteBin5Fill />
                    </button>
                    <button
                        onClick={AddCustomer}
                        style={{ background: "#078625" }}
                    >
                        Qo'shish <MdLibraryAddCheck />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddUser
