import "./Login.css"
import { Link, useNavigate } from "react-router-dom"
import background from "./Images/background.png"
import { useContext, useEffect, useState } from "react"
import { LuDelete } from "react-icons/lu"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"
import Array from "../../Array"

import UserContext from "../../Context/Context"
import { collection, doc, getDocs, updateDoc } from "firebase/firestore"
import { db } from "../../firebase"

import cat from "../../Images/cat.png"
import corgi from "../../Images/corgi.png"
import dragon from "../../Images/dragon.png"
import elephand from "../../Images/elephand.png"
import fox from "../../Images/fox.png"
import pannda from "../../Images/panda.png"
import penguin from "../../Images/penguin.png"
import robbit from "../../Images/robbit.png"
import ball from "../../Images/ball.png"
import bike from "../../Images/bike.png"
import cheese from "../../Images/cheese.png"
import rome from "../../Images/rome.png"
import sunglasess from "../../Images/sunglasess.png"
import sushi from "../../Images/sushi.png"
import avacado from "../../Images/avacado.png"
import watermaleon from "../../Images/watermaleon.png"
import pizza from "../../Images/pizza.png"
import disc from "../../Images/disc.png"

import { FaPlus } from "react-icons/fa"
import firebase from "firebase/compat/app"

const Login = () => {
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

    const contextValue = useContext(UserContext)

    const [inputValue, setInputValue] = useState("")
    const [nameValue, setNameValue] = useState("")
    const [eye, setEye] = useState(false)
    const [eyeSlash, setEyeSlash] = useState(true)
    const [Type, setType] = useState("password")
    const [Show, setShow] = useState("none")
    const [Hid, setHid] = useState("none")
    const navigate = useNavigate()

    const [FirebaseAdmin, setFirebaseAdmin] = useState([])
    const [FirebaseDoctor, setFirebaseDoctor] = useState([])

    const Unlock = () => {
        const doctor = FirebaseDoctor.find((item) => item.code === inputValue)
        const admin = FirebaseAdmin.find((item) => item.code === inputValue)

        if (admin || doctor) {
            localStorage.setItem("PINcode", JSON.stringify(inputValue))
            window.location.reload()
        }

        else {
            alert("Noto'g'ri PIN!")
            setInputValue("")
            setNameValue("")
        }
    }

    useEffect(() => {
        const getUsers = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "admins"));
                const usersArray = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setFirebaseAdmin(usersArray);
            } catch (error) {
                console.error("Xatolik yuz berdi:", error);
            }
        };

        getUsers();
    }, []);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "users"));
                const usersArray = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setFirebaseDoctor(usersArray);
            } catch (error) {
                console.error("Xatolik yuz berdi:", error);
            }
        };

        getUsers();
    }, []);

    const UnlockEnter = (e) => {
        if (e.key === "Enter" || e.key === "NumpadEnter") {
            const doctor = FirebaseDoctor.find((item) => item.code === inputValue)
            const user = FirebaseAdmin.find((item) => item.code === inputValue)

            if (user || doctor) {
                localStorage.setItem("PINcode", JSON.stringify(inputValue))
                window.location.reload()
            }
            else if (inputValue && nameValue === "") {
                e.preventDefault()
            }
            else {
                alert("Noto'g'ri PIN!");
                setInputValue("")
                setNameValue("")
            }
        }
    }

    const show = () => {
        if (eyeSlash) {
            setEye(true)
            setEyeSlash(false)
            setHid("none")
            setShow("block")
            setType("text")
        }
        else {
            setEyeSlash(true)
            setEye(false)
            setHid("block")
            setShow("none")
            setType("password")
        }
    }

    const hid = () => {
        if (eye) {
            setEyeSlash(true)
            setEye(false)
            setHid("block")
            setShow("none")
            setType("password")
        }
        else {
            setEyeSlash(false)
            setEye(true)
            setHid("none")
            setShow("block")
            setType("text")
        }
    }

    return (
        <section className="loginContainer" style={{ background: `center/cover url("${background}")` }}>
            <div className="backgdrop">
                <div className="login">
                    <h3>Tizimga Kirish</h3>
                    <div className="enterCode">
                        <input
                            type="text"
                            autoFocus
                            placeholder="Name:"
                            onChange={(e) => setNameValue(e.target.value)}
                            value={nameValue}
                        />
                        <input
                            type={Type}
                            onInput={() => setHid("block")}
                            maxLength={4}
                            placeholder="Parol:"
                            onChange={(e) => setInputValue(e.target.value)}
                            value={inputValue}
                            onKeyUp={(e) => UnlockEnter(e)}
                        />
                        <FaRegEye className="w-5 h-5 cursor-pointer " style={{ display: Show }} onClick={show} />
                        <FaRegEyeSlash className="w-5 h-5 cursor-pointer " style={{ display: Hid }} onClick={hid} />
                    </div>
                    <button onClick={Unlock} disabled={inputValue && nameValue ? false : true}>Tizimga kirish</button>
                </div>
            </div>
        </section>
    )
}

export default Login
