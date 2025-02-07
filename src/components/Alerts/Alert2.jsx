import { HiPlus } from "react-icons/hi"
import { IoClose } from "react-icons/io5"
import { RiDeleteBin5Fill } from "react-icons/ri"

import "../../style/Alert2.css"

const Alert2 = ({ titleText, buttonText, alertShow, alertHid }) => {
    return (
        <div className="alert2">
            <div className="title">
                <h3>
                    {titleText}
                </h3>
                <IoClose onClick={() => alertShow(false)} />
            </div>
            <div className="inputs">
                <input type="text" placeholder="Hodim ism familiyasi:"/>
                <input type="text" placeholder="Telifon raqami: "/>
                <input type="text" placeholder="Yo'nalish"/>
                <input type="text" placeholder="Parol"/>
                <input type="text" placeholder="Maosh"/>
                <input type="date" placeholder="dd/mm/yyyy"/>
            </div>
            <div className="buttons">
                <button onClick={() => alertHid(true)} style={{background: "#ff1216"}}>Bekor qilish <RiDeleteBin5Fill style={{width: "25px"}}/></button>
                <button style={{ background: "#078625" }}>{buttonText} <HiPlus style={{ width: "25px" }} /></button>
            </div>
        </div>
    )
}

export default Alert2