import "./Login.css"
import background from "./Images/background.png"
import { useState } from "react"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"
import { useProductContext } from "../../Context/ProductProvider";

const Login = () => {
    const { admins, users } = useProductContext()

    const [inputValue, setInputValue] = useState("")
    const [nameValue, setNameValue] = useState("")
    const [eye, setEye] = useState(false)
    const [eyeSlash, setEyeSlash] = useState(true)
    const [Type, setType] = useState("password")
    const [Show, setShow] = useState("none")
    const [Hid, setHid] = useState("none")

    const Unlock = () => {
        const doctor = users.find((item) => item?.code === inputValue)
        const admin = admins.find((item) => item?.code === inputValue)

        if (admin || doctor) {
            const user = admin || doctor;
            const firstName = user.name.split(" ")[0];

            localStorage.setItem("PINcode", inputValue);
            localStorage.setItem("UserName", firstName);
            window.location.reload();
        }
        else {
            alert("Noto'g'ri PIN yoki Login");
        }
    }

    const UnlockEnter = (e) => {
        if (e.key === "Enter" || e.key === "NumpadEnter") {
            const doctor = users.find((item) => item.code === inputValue );
            const admin = admins.find((item) => item.code === inputValue );

            if (admin || doctor) {
                const user = admin || doctor;
                const firstName = user.name.split(" ")[0];

                localStorage.setItem("PINcode", inputValue)
                localStorage.setItem("UserName", firstName)
                window.location.reload();
            }
            else if ((inputValue && nameValue) === "") {
                alert("Iltimos ma'lumot kiriting")
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
                        />
                        <div className="inpEyes">
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
                    </div>
                    <button onClick={Unlock} disabled={inputValue && nameValue ? false : true}>Tizimga kirish</button>
                </div>
            </div>
        </section>
    )
}

export default Login
