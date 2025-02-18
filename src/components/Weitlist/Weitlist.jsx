import "./Weitlist.css";
import { GrFilter } from "react-icons/gr";
import UserContext from "../../Context/Context"
import { useContext, useEffect, useState } from "react";
import { HiPlus } from "react-icons/hi";
import { getCustomers } from "../../service/fireStoreCustomerService";
import { getUsers } from "../../service/fireStoreDoctorService";
import { getAdmin } from "../../service/fireStoreAdminService";


const Weitlist = ({ width1, addCustomer }) => {

    const PINcode = JSON.parse(localStorage.getItem("PINcode"))
    const [FirebaseUsers, setFirebaseUsers] = useState([])
    const [FirebaseAdmin, setFirebaseAdmin] = useState([])
    const [FirebaseCustomer, setFirebaseCustomers] = useState([]);

    const { id, setId, alert4Show, setAlert4Show } = useContext(UserContext);

    const FindAdmin = FirebaseAdmin.find(item => item.code === PINcode)
    const FindUser = FirebaseUsers.find(item => item.code === PINcode)

    const contextId = useContext(UserContext)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await getCustomers();
                setFirebaseCustomers(usersData);
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
    }, [getAdmin]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await getUsers();
                setFirebaseUsers(usersData);
            } catch (error) {
                console.error("Failed to fetch users:", error);
            }
        };

        fetchUsers();
    }, []);

    const [Name, setName] = useState("Saralash")

    const [opasity, setOpasity] = useState(0)
    const [top, setTop] = useState("0px")
    const [Pointer, setPointer] = useState("none")

    const nmadir = () => {
        setTop("70px")
        setPointer("all")
        setOpasity(1)
    }

    const xechnma = (name) => {
        setTop("0px")
        setPointer("none")
        setOpasity(0)
        setName(name)
    }

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
        setId(id)
        setAlert4Show(true)
    }

    return (
        <section className="Weitlist" style={{ width: width1 }}>
            <div className="customerFilte">
                <div className="saralash" onClick={nmadir}>
                    <h3>
                        {Name}
                    </h3>
                    <GrFilter />
                </div>

                {FindAdmin ?
                    <div style={{ opacity: opasity, pointerEvents: Pointer, top: top }} className="filter">
                        <h3 onClick={() => xechnma("Hammasi")}>
                            Hammasi
                        </h3>
                        {
                            FirebaseUsers.map(item =>
                                <h3 onClick={() => xechnma(item.name)}>
                                    {item.name}
                                </h3>
                            )
                        }
                    </div>
                    : ""}

                <div className="customerPlus" onClick={() => addCustomer(true)}>
                    <h3>
                        Mijoz qo'shish
                    </h3>
                    <HiPlus />
                </div>
            </div>
            <div className="customersCards">
                {
                    FindAdmin ? FilteredCustomers().map(item =>
                        <div className="customers cursor-pointer" onClick={() => FilterId(item.id)}>
                            <div className="id">
                                <span>
                                    Id: {item.id}
                                </span>
                                <p>
                                    Status
                                </p>
                            </div>
                            <h4>
                                Mijoz: {item.name}
                            </h4>
                        </div>
                    ) : FirebaseCustomer.filter(item => item.doctorName === FindUser?.name && item.delate === true)
                        .sort((a, b) => a.id - b.id).slice(0, 2)
                        .map(item =>
                            <div className="customers cursor-pointer" onClick={() => FilterId(item.id)}>
                                <div className="id">
                                    <span>
                                        Id: {item.id}
                                    </span>
                                    <p>
                                        Status
                                    </p>
                                </div>
                                <h4>
                                    Mijoz: {item.name}
                                </h4>
                            </div>
                        )
                }
            </div>
        </section>
    );
};

export default Weitlist;
