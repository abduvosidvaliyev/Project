import "../style/Profile.css"
import { useEffect, useState } from "react"
import { HiArrowLeftStartOnRectangle } from "react-icons/hi2"
import { IoCloseSharp } from "react-icons/io5"
import { getAdmin, getAdminId, updateAdmin } from "../service/fireStoreAdminService"
import { getUsers, getUsersId, updateUser } from "../service/fireStoreDoctorService"

import cat from "../Images/cat.png"
import corgi from "../Images/corgi.png"
import dragon from "../Images/dragon.png"
import elephand from "../Images/elephand.png"
import fox from "../Images/fox.png"
import pannda from "../Images/panda.png"
import penguin from "../Images/penguin.png"
import robbit from "../Images/robbit.png"
import ball from "../Images/ball.png"
import bike from "../Images/bike.png"
import cheese from "../Images/cheese.png"
import rome from "../Images/rome.png"
import sunglasess from "../Images/sunglasess.png"
import sushi from "../Images/sushi.png"
import avacado from "../Images/avacado.png"
import watermaleon from "../Images/watermaleon.png"
import pizza from "../Images/pizza.png"
import disc from "../Images/disc.png"
import { useNavigate } from "react-router-dom"


const Profile = () => {

    const imagesArray = [
        cat,
        corgi,
        dragon,
        elephand,
        fox,
        pannda,
        penguin,
        robbit,
        ball,
        bike,
        cheese,
        rome,
        sunglasess,
        sushi,
        avacado,
        watermaleon,
        pizza,
        disc
    ]

    const PINcode = JSON.parse(localStorage.getItem("PINcode"));

    const [FirebaseDoctor, setFirebaseDoctor] = useState([]);
    const [FirebaseAdmin, setFirebaseAdmin] = useState([]);
    const [ImgSrc, setImgSrc] = useState("");
    const navigate = useNavigate();

    const doctor = FirebaseDoctor.find(item => item.code === PINcode);
    const user = FirebaseAdmin.find(item => item.code === PINcode);

    const [ProfileSH, setProfileSH] = useState(true);
    const [ImagesSH, setImagesSH] = useState(false);

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


    useEffect(() => {
        if (user) {
            setImgSrc(user.images || "");
        } else if (doctor) {
            setImgSrc(doctor.images || "");
        }
    }, [user, doctor]);


    const UpdateImg = async (imgSrc) => {
        try {
            if (doctor) {
                if (usersId) {
                    await updateUser(usersId[doctor.id], { images: imgSrc });
                }
            } else if (user) {
                if (adminsId) {
                    await updateAdmin(adminsId[0], { images: imgSrc });
                }
            }

            setImgSrc(imgSrc);
        } catch (error) {
            console.error("Failed to update user image:", error);
        }
    };

    const hiddenProfile = () => {
        setProfileSH(true)
        setImagesSH(false)
    }

    const loginOut = () => {
        localStorage.removeItem("PINcode");
        setTimeout(() => {
            window.location.href = "/"
        }, 500);
    };
    return (
        <div className="categories">
            {user || doctor ? (
                <div className="users cursor-pointer" onClick={() => setProfileSH(false)}>
                    <h3>{user ? user.name : doctor.name}</h3>
                    {ImgSrc ? <img src={ImgSrc} alt="" /> : <h3 className="textImg">{(user ? user.name : doctor.name)[0]}</h3>}
                </div>
            ) : (
                <h1>Foydalanuvchi topilmadi!</h1>
            )}

            {user || doctor ? (
                <div className={ProfileSH ? "usersInfo profileHid" : "usersInfo profileShow"}>
                    <IoCloseSharp onClick={hiddenProfile} />
                    {
                        ImgSrc ?
                            <img onClick={() => setImagesSH(true)} src={ImgSrc} alt="" /> :
                            <h3
                                onClick={() => setImagesSH(true)}
                                className="textImg cursor-pointer"
                            >
                                {(user ? user.name : doctor.name)[0]}
                            </h3>
                    }
                    <h3>{user ? user.name : doctor.name}</h3>
                    <h3>Oliy toifali</h3>
                    <p className="cursor-pointer" onClick={loginOut}>
                        Log out <HiArrowLeftStartOnRectangle />
                    </p>
                    <div className={ImagesSH ? "images imagesShow" : "images imagesHid"}>
                        <IoCloseSharp onClick={() => setImagesSH(false)} />
                        {imagesArray.map((item, index) => (
                            <img key={index} src={item} onClick={() => UpdateImg(item)} alt="" />
                        ))}
                    </div>
                </div>
            ) : ""}
        </div>
    )
}

export default Profile