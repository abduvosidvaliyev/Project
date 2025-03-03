import "./Weitlist.css";
import { GrFilter } from "react-icons/gr";
import UserContext from "../../Context/Context";
import { useContext, useEffect, useState } from "react";
import { HiPlus } from "react-icons/hi";
import { subscribeToCustomers } from "../../service/fireStoreCustomerService";
import { getUsers } from "../../service/fireStoreDoctorService";
import { subscribeToAdmins } from "../../service/fireStoreAdminService";

const Weitlist = ({ width1, addCustomer }) => {
    const PINcode = localStorage.getItem("PINcode");
    const [FirebaseUsers, setFirebaseUsers] = useState([]);
    const [FirebaseAdmin, setFirebaseAdmin] = useState([]);
    const [FirebaseCustomer, setFirebaseCustomers] = useState([]);

    const { setId, setAlert4Show } = useContext(UserContext);

    const FindAdmin = FirebaseAdmin.find(item => item.code === PINcode);
    const FindUser = FirebaseUsers.find(item => item.code === PINcode);

    // **Mijozlarni olish (real vaqt rejimida)**
    useEffect(() => {
        const unsubscribe = subscribeToCustomers(setFirebaseCustomers);
        return () => unsubscribe(); // Komponent unmount bo‘lganda kuzatuvni to‘xtatish
    }, []);

    // **Adminlarni olish (real vaqt rejimida)**
    useEffect(() => {
        const unsubscribe = subscribeToAdmins(setFirebaseAdmin);
        return () => unsubscribe();
    }, []);

    // **Foydalanuvchilarni olish (real vaqt rejimida)**
    useEffect(() => {
        const unsubscribe = getUsers(setFirebaseUsers);
        return () => unsubscribe();
    }, []);

    const [Name, setName] = useState("Saralash");
    const [opasity, setOpasity] = useState(0);
    const [top, setTop] = useState("0px");
    const [Pointer, setPointer] = useState("none");

    const nmadir = () => {
        setTop("70px");
        setPointer("all");
        setOpasity(1);
    };

    const xechnma = (name) => {
        setTop("0px");
        setPointer("none");
        setOpasity(0);
        setName(name);
    };

    const FilteredCustomers = () => {
        if (Name === "Hammasi" || Name === "Saralash") {
            const doctorGroups = {};

            FirebaseCustomer
                .filter(item => item.complated === true && item.delate === true)
                .sort((a, b) => a.id - b.id)
                .forEach(item => {
                    if (!doctorGroups[item.doctorName]) {
                        doctorGroups[item.doctorName] = [];
                    }
                    doctorGroups[item.doctorName].push(item);
                });

            return Object.values(doctorGroups).flatMap(customers => customers.slice(0, 2));
        }

        return FirebaseCustomer
            .filter(item => item.doctorName === Name && item.complated === true && item.delate === true)
            .sort((a, b) => a.id - b.id)
            .slice(0, 2);
    };

    const FilterId = (id) => {
        setId(id);
        setAlert4Show(true);
    };

    return (
        <section className="Weitlist" style={{ width: width1 }}>
            <div className="customerFilte">
                <div className="saralash" onClick={nmadir}>
                    <h3>{Name}</h3>
                    <GrFilter />
                </div>

                {FindAdmin ? (
                    <div style={{ opacity: opasity, pointerEvents: Pointer, top: top }} className="filter">
                        <h3 onClick={() => xechnma("Hammasi")}>Hammasi</h3>
                        {FirebaseUsers.map(item => (
                            <h3 key={item.name} onClick={() => xechnma(item.name)}>
                                {item.name}
                            </h3>
                        ))}
                    </div>
                ) : null}

                <div className="customerPlus" onClick={() => FirebaseUsers.length >= 1 ? addCustomer(true) : alert("Iltimos oldin doktor qo'shing")}>
                    <h3>Mijoz qo'shish</h3>
                    <HiPlus />
                </div>
            </div>
            <div className="customersCards">
                {FindAdmin
                    ? FilteredCustomers().map(item => (
                        <div key={item.id} className="customers cursor-pointer" onClick={() => FilterId(item.id)}>
                            <div className="id">
                                <span>Id: {item.id}</span>
                                <p>Status</p>
                            </div>
                            <h4>Mijoz: {item.name}</h4>
                        </div>
                    ))
                    : FirebaseCustomer.filter(item => item.doctorName === FindUser?.name && item.delate === true)
                        .sort((a, b) => a.id - b.id)
                        .slice(0, 2)
                        .map(item => (
                            <div key={item.id} className="customers cursor-pointer" onClick={() => FilterId(item.id)}>
                                <div className="id">
                                    <span>Id: {item.id}</span>
                                    <p>Status</p>
                                </div>
                                <h4>Mijoz: {item.name}</h4>
                            </div>
                        ))}
            </div>
        </section>
    );
};

export default Weitlist;
