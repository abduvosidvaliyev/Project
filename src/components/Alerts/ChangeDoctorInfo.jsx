import "../../style/Alert2.css"

import { HiPlus } from "react-icons/hi"
import { IoClose } from "react-icons/io5"
import { RiDeleteBin5Fill } from "react-icons/ri"

import { useEffect, useState } from "react"
import { getUsersId, updateUser } from "../../service/fireStoreDoctorService"
import { getCustomers, getCustomersByDoctorId, updateCustomers } from "../../service/fireStoreCustomerService"

const Alert2 = ({ alertShow, chengeNotify, alertHid, userInfo }) => {

    const [Name, setName] = useState("")
    const [Number, setNumber] = useState("")
    const [Job, setJob] = useState("")
    const [Code, setCode] = useState("")
    const [Money, setMoney] = useState("")
    const [Data, setData] = useState("")

    const [usersId, setUsersId] = useState([]);
    const [customer, setCustomers] = useState([]);

    useEffect(() => {
        const unsubscribeUsers = getUsersId((usersData) => {
            setUsersId(usersData);
        });

        const unsubscribeCustomers = getCustomersByDoctorId(userInfo.name, (customers) => {
            setCustomers(customers);
        });

        return () => {
            unsubscribeUsers();
            unsubscribeCustomers();
        };
    }, []);

    const updateDoctorAndCustomers = async () => {
        try {
            const doctorId = usersId[userInfo.id - 1];

            await updateUser(doctorId, {
                name: Name,
                job: Job,
                number: Number,
                code: Code,
                money: Money,
                year: Data
            });

            const updatePromises = customer.map(customer =>
                updateCustomers(customer.customerId, { doctorName: Name }),
            );

            await Promise.all(updatePromises);

            alertShow(false);
            chengeNotify()
        } catch (error) {
            console.error("Failed to update doctor and related customers:", error);
        }
    };

    return (
        <div className="alert2">
            <div className="title">
                <h3>
                    Ma'lumotlarni o'zgartirish
                </h3>
                <IoClose onClick={() => alertShow(false)} />
            </div>
            <div className="inputs">
                <input type="text" onChange={(e) => setName(e.target.value)} placeholder="Hodim ism familiyasi:" />
                <input type="text" onChange={(e) => setNumber(e.target.value)} placeholder="Telefon raqami: " />
                <input type="text" onChange={(e) => setJob(e.target.value)} placeholder="Yo'nalish" />
                <input type="text" onChange={(e) => setCode(e.target.value)} placeholder="Parol" />
                <input type="text" onChange={(e) => setMoney(e.target.value)} placeholder="Maosh" />
                <input type="date" onChange={(e) => setData(e.target.value)} placeholder="dd/mm/yyyy" />
            </div>
            <div className="buttons">
                <button
                    onClick={() => alertHid(true)}
                    style={{ background: "#ff1216" }}
                >
                    Bekor qilish <RiDeleteBin5Fill style={{ width: "25px" }} />
                </button>
                <button onClick={updateDoctorAndCustomers} style={{ background: "#078625" }}>O'zgartirildi <HiPlus style={{ width: "25px" }} /></button>
            </div>
        </div>
    )
}

export default Alert2;
