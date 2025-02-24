import "./Login.css"
import background from "./Images/background.png"
import { useEffect, useState } from "react"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../../firebase";

const Login = () => {
    const [inputValue, setInputValue] = useState("")
    const [nameValue, setNameValue] = useState("")
    const [eye, setEye] = useState(false)
    const [eyeSlash, setEyeSlash] = useState(true)
    const [Type, setType] = useState("password")
    const [Show, setShow] = useState("none")
    const [Hid, setHid] = useState("none")

    const [FirebaseAdmin, setFirebaseAdmin] = useState([])
    const [FirebaseDoctor, setFirebaseDoctor] = useState([])

    const Unlock = () => {
        const doctor = FirebaseDoctor.find((item) => item.code === inputValue && item.name.split(" ")[0] === nameValue)
        const admin = FirebaseAdmin.find((item) => item.code === inputValue && item.name.split(" ")[0] === nameValue)

        if (admin || doctor) {
            const user = admin || doctor;
            const firstName = user.name.split(" ")[0];

            localStorage.setItem("PINcode", JSON.stringify(inputValue));
            localStorage.setItem("UserName", firstName);
            window.location.reload();
        }
        else {
            alert("Noto'g'ri PIN yoki Login");
        }
    }

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "admins"), (snapshot) => {
            const usersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setFirebaseAdmin(usersData);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
            const usersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setFirebaseDoctor(usersData);
        });
        return () => unsubscribe();
    }, []);

    const UnlockEnter = (e) => {
        if (e.key === "Enter" || e.key === "NumpadEnter") {
            const doctor = FirebaseDoctor.find((item) => item.code === inputValue && item.name.split(" ")[0] === nameValue)
            const admin = FirebaseAdmin.find((item) => item.code === inputValue && item.name.split(" ")[0] === nameValue)
            console.log(admin, doctor)

            if (admin || doctor) {
                const user = admin || doctor;
                const firstName = user.name.split(" ")[0];

                localStorage.setItem("PINcode", JSON.stringify(inputValue));
                localStorage.setItem("UserName", JSON.stringify(firstName));
                window.location.reload();
            }
            else if (inputValue && nameValue === "") {
                e.preventDefault()
            }
            else {
                alert("Noto'g'ri PIN yoki Login");
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
                            onKeyUp={(e) => UnlockEnter(e)}
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
