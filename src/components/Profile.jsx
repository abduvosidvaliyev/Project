import "../style/Profile.css"
import { useEffect, useState } from "react"
import { HiArrowLeftStartOnRectangle } from "react-icons/hi2"
import { IoCloseSharp } from "react-icons/io5"
import { getAdmin, getAdminId, updateAdmin } from "../service/fireStoreAdminService"
import { getUsers, getUsersId, updateUser } from "../service/fireStoreDoctorService"

import { useNavigate } from "react-router-dom"


const Profile = () => {
    const PINcode = JSON.parse(localStorage.getItem("PINcode"));

    const [FirebaseDoctor, setFirebaseDoctor] = useState([]);
    const [FirebaseAdmin, setFirebaseAdmin] = useState([]);
    const navigate = useNavigate();
    const [ProfileSh, setProfileSH] = useState(true)

    const doctor = FirebaseDoctor.find(item => item.code === PINcode);
    const user = FirebaseAdmin.find(item => item.code === PINcode);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await getUsers();
                setFirebaseDoctor(usersData);
            } catch (error) {
                console.error("Failed to fetch users:", error);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await getAdmin();
                setFirebaseAdmin(usersData);
            } catch (error) {
                console.error("Failed to fetch users:", error);
            }
        };

        fetchUsers();
    }, []);

    const [adminsId, setAdminId] = useState([]);

    useEffect(() => {
        const fetchCustomerIds = async () => {
            try {
                const ids = await getAdminId();
                setAdminId(ids);
            } catch (error) {
                console.error("Failed to fetch customer IDs:", error);
            }
        };

        fetchCustomerIds();
    }, []);

    const [usersId, setUsersId] = useState([]);


    useEffect(() => {
        const fetchCustomerIds = async () => {
            try {
                const ids = await getUsersId();
                setUsersId(ids);
            } catch (error) {
                console.error("Failed to fetch customer IDs:", error);
            }
        };

        fetchCustomerIds();
    }, []);

    const loginOut = () => {
        localStorage.removeItem("PINcode");
        setTimeout(() => {
            window.location.href = "/"
        }, 500);
    };
    return (
        <div className="categories">
            {user || doctor ? (
                <div className="users" onClick={() => setProfileSH(false)}>
                    <h3>{user ? user.name : doctor.name}</h3>
                    <h3 className="textImg">{(user ? user.name : doctor.name)[0]}</h3>
                </div>
            ) : (
                <h1>Foydalanuvchi topilmadi!</h1>
            )}

            {user || doctor ? (
                <div className={ProfileSh ? "usersInfo profileHid" : "usersInfo profileShow"}>
                    <IoCloseSharp onClick={() => setProfileSH(true)} />
                    <h3 className="textImg">
                        {(user ? user.name : doctor.name)[0]}
                    </h3>
                    <h3>{user ? user.name : doctor.name}</h3>
                    <h3>Oliy toifali</h3>
                    <p className="cursor-pointer" onClick={loginOut}>
                        Log out <HiArrowLeftStartOnRectangle />
                    </p>
                </div>
            ) : ""}
        </div>
    )
}

export default Profile