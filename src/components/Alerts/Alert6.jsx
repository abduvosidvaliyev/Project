import { CiEdit } from "react-icons/ci"
import { IoClose } from "react-icons/io5"
import { RiDeleteBin5Fill } from "react-icons/ri"

const Alert6 = ({ alertShow, alert2Show }) => {
    return (
        <div className="alert2">
            <div className="title">
                <h3>
                    Ma'lumotni o'zgartirish
                </h3>
                <IoClose onClick={() => alertShow(false)} />
            </div>
            <div className="inputs">
                <input type="text" placeholder="Hodim ism familiyasi:" />
                <input type="text" placeholder="Telifon raqami: " />
                <input type="text" placeholder="Yo'nalish" />
                <input type="text" placeholder="Parol" />
                <input type="text" placeholder="Maosh" />
                <input type="date" placeholder="dd/mm/yyyy" />
            </div>
            <div className="buttons">
                <button
                    onClick={() => alert2Show(false)}
                    style={{ background: "#ff1216" }}
                >
                    Bekor qilish
                    <RiDeleteBin5Fill
                        style={{ width: "25px" }}
                    />
                </button>
                <button
                    style={{ background: "#5f53fe" }}
                >
                    O'zgartirish
                    <CiEdit
                        style={{ width: "25px" }}
                    />
                </button>
            </div>
        </div>
    )
}

export default Alert6