import { CiEdit } from "react-icons/ci"
import { IoClose } from "react-icons/io5"
import { MdLibraryAddCheck } from "react-icons/md"
import { RiDeleteBin5Fill } from "react-icons/ri"

import "../../style/Alert1.css"

import Alert2 from "./Alert2"
import { useState } from "react"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase"

const Alert1 = ({ alertShow, userInformation, sarlavha, yonalish, son, royhat }) => {

    const [alert1Hid, setAlert1Hid] = useState(true)

    const deleteDoctor = async (doctorId) => {
        try {
            alertShow(false)
            const doctorRef = doc(db, "users", doctorId);
            await updateDoc(doctorRef, { delate: false });
        } catch (error) {
            console.error("Xatolik yuz berdi:", error);
        }
    }

    return (
        <div className="alertContainer">
            {
                alert1Hid ?
                    <div className="alert">
                        <div className="title">
                            <h3>{sarlavha}</h3>
                            <IoClose onClick={() => alertShow(false)} />
                        </div>
                        <div className="userInfo">
                            <h3>{yonalish}: {userInformation.job}</h3>
                            <h3>Doktor: {userInformation.name}</h3>
                            <h3>Oylik maosh:</h3>
                            <h3>Tel: </h3>
                            <h3>{son}: </h3>
                            <h3>{royhat}: {userInformation.code}</h3>
                        </div>
                        <div className="buttons">
                            <button onClick={() => deleteDoctor(userInformation.id)} style={{ background: "#ff1216" }}>O'chirish <RiDeleteBin5Fill /> </button>

                            <button onClick={() => setAlert1Hid(false)} style={{ background: "#5f53fe" }}>O'zgartirish <CiEdit /></button>
                            
                            <button style={{ background: "#078625" }}>Tatil berish <MdLibraryAddCheck /></button>
                        </div>
                    </div> :
                    <Alert2 alertShow={alertShow} alertHid={setAlert1Hid} titleText="Malumotlarni o'zgartirish" buttonText="O'zgartirildi" />
            }
        </div>
    )
}

export default Alert1