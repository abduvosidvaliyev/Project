import "../../style/Alert2.css";
import { HiPlus } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { getUsersId, updateUser } from "../../service/fireStoreDoctorService";
import { getCustomersByDoctorId, updateCustomers } from "../../service/fireStoreCustomerService";

const Alert2 = ({ alertShow, UserInformation, chengeNotify, alertHid, userInfo }) => {
    const [formData, setFormData] = useState({ ...UserInformation });
    const [usersId, setUsersId] = useState([]);
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const unsubscribeUsers = getUsersId(setUsersId);
        const unsubscribeCustomers = getCustomersByDoctorId(userInfo.name, setCustomers);
        return () => { unsubscribeUsers(); unsubscribeCustomers(); };
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const updateDoctorAndCustomers = async () => {
        alertShow(false);
        chengeNotify();
        try {
            const doctorId = usersId[userInfo.id - 1];
            await updateUser(doctorId, formData);
            await Promise.all(customers.map(customer => updateCustomers(customer.customerId, {
                name: formData.name,
                number: formData.number,
                job: formData.job,
                money: formData.money,
                year: formData.year,
                code: formData.code
            })));
        } catch (error) {
            console.error("Failed to update doctor and related customers:", error);
        }
    };

    return (
        <div className="alert2">
            <div className="title">
                <h3>Ma'lumotlarni o'zgartirish</h3>
                <IoClose onClick={() => alertShow(false)} />
            </div>
            <div className="inputs">
                {["name", "number", "job", "code", "money", "year"].map((field, index) => (
                    <input
                        key={index}
                        type={field === "year" ? "date" : "text"}
                        name={field}
                        value={formData[field] || ""}
                        onChange={handleChange}
                        placeholder={
                            field === "name" ? "Hodim ism familiyasi:" :
                                field === "number" ? "Telefon raqami:" :
                                    field === "job" ? "Yo'nalish:" :
                                        field === "code" ? "Parol:" :
                                            field === "money" ? "Maosh:" :
                                                "dd/mm/yyyy"
                        }
                    />
                ))}
            </div>
            <div className="buttons">
                <button onClick={() => alertHid(true)} style={{ background: "#ff1216" }}>
                    Bekor qilish <RiDeleteBin5Fill style={{ width: "25px" }} />
                </button>
                <button onClick={updateDoctorAndCustomers} style={{ background: "#078625" }}>
                    O'zgartirildi <HiPlus style={{ width: "25px" }} />
                </button>
            </div>
        </div>
    );
};

export default Alert2;
