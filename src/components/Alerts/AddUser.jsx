import "../../style/AddUser.css";
import { IoClose } from "react-icons/io5";
import { MdLibraryAddCheck } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { addUser } from "../../service/fireStoreDoctorService";
import { useState } from "react";

const AddUser = ({ AddUser, AddNotify, doctor }) => {
    const [formData, setFormData] = useState({ name: "", job: "", number: "", code: "", money: "", year: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    async function AddCustomer() {
        if (Object.values(formData).some(value => !value)) {
            alert("Barcha joylarni to'ldiring");
            return;
        }
        
        AddUser(false);
        AddNotify();

        try {
            await addUser({
                id: doctor.length + 1,
                ...formData,
                delate: true,
                complated: true,
                createdAt: new Date()
            });
        } catch (error) {
            console.error("Failed to add user:", error);
        }
    }

    return (
        <div className="customerContainer">
            <div className="addUser">
                <div className="title">
                    <h3>Hodim Qo'shish</h3>
                    <IoClose onClick={() => AddUser(false)} />
                </div>
                <div className="input">
                    {["name", "number", "job", "code", "money", "year"].map((field, index) => (
                        <input
                            key={index}
                            type={field === "year" ? "date" : "text"}
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            placeholder={
                                field === "name" ? "Hodim ism familiyasi:" :
                                field === "number" ? "Tel raqam:" :
                                field === "job" ? "Yo'nalishi:" :
                                field === "code" ? "Parol:" :
                                field === "money" ? "Oylik:" :
                                ""
                            }
                        />
                    ))}
                </div>
                <div className="customerButtons">
                    <button onClick={() => AddUser(false)} style={{ background: "#ff1216" }}>
                        Bekor qilish <RiDeleteBin5Fill />
                    </button>
                    <button onClick={AddCustomer} style={{ background: "#078625" }}>
                        Qo'shish <MdLibraryAddCheck />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddUser;
