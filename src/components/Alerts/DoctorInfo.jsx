import { CiEdit } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { MdLibraryAddCheck } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";

import "../../style/Alert1.css";

import Alert2 from "./ChangeDoctorInfo";
import { useEffect, useState } from "react";
import { deleteUser, getUsersId } from "../../service/fireStoreDoctorService";

const Alert1 = ({ alertShow, DelateNotify, ChengeNotify, userInformation, doctor }) => {
    const [doctorIds, setDoctorIds] = useState([]);

    useEffect(() => {
        const unsubscribe = getUsersId(setDoctorIds);
        return () => unsubscribe(); // Cleanup function to unsubscribe on unmount
    }, []);

    const [alert1Hid, setAlert1Hid] = useState(true);

    const deleteDoctor = async (doctorId) => {
        try {
            await deleteUser(doctorIds[doctorId - 1]);
            alertShow(false);
            DelateNotify();
        } catch (error) {
            console.error("Xatolik yuz berdi:", error);
        }
    };

    const formatDate = (timestamp) => {
        if (timestamp && timestamp.seconds) {
            return new Date(timestamp.seconds * 1000).toLocaleDateString();
        }
        return "Noma'lum";
    };

    return (
        <div className="alertContainer">
            {alert1Hid ? (
                <div className="alert">
                    <div className="title">
                        <h3>Hodim</h3>
                        <IoClose onClick={() => alertShow(false)} />
                    </div>
                    <div className="userInfo">
                        <h3>Id: {userInformation.id}</h3>
                        <h3>Doktor: {userInformation.name || "Noma'lum"}</h3>
                        <h3>Yo'nalish: {userInformation.job || "Noma'lum"}</h3>
                        <h3>Oylik maosh: {userInformation.money || "Noma'lum"}</h3>
                        <h3>Tel: {userInformation.number || "Noma'lum"}</h3>
                        <h3>Login: {userInformation.name ? userInformation.name.split(" ")[0] : "Noma'lum"}</h3>
                        <h3>Parol: {userInformation.code || "Noma'lum"}</h3>
                        <h3>Qachon ro'yhatdan o'tgan: {formatDate(userInformation.createdAt)}</h3>
                        <h3>Tug'ilgan yili: {userInformation.year}</h3>
                    </div>
                    <div className="buttons">
                        <button onClick={() => deleteDoctor(userInformation.id)} style={{ background: "#ff1216" }}>
                            O'chirish <RiDeleteBin5Fill />
                        </button>

                        <button onClick={() => setAlert1Hid(false)} style={{ background: "#5f53fe" }}>
                            O'zgartirish <CiEdit />
                        </button>

                        <button style={{ background: "#078625" }}>
                            Tatil berish <MdLibraryAddCheck />
                        </button>
                    </div>
                </div>
            ) : (
                <Alert2
                    chengeNotify={ChengeNotify}
                    doctor={doctor}
                    alertShow={alertShow}
                    userInfo={userInformation}
                    alertHid={setAlert1Hid}
                />
            )}
        </div>
    );
};

export default Alert1;
