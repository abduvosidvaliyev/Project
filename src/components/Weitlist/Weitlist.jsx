import "./Weitlist.css";
import { GrFilter } from "react-icons/gr";
import { useState } from "react";
import { HiPlus } from "react-icons/hi";
import { useProductContext } from "../../Context/ProductProvider";

const Weitlist = ({ width1, addCustomer }) => {
    const { setId, setAlert4Show, admins, users, custom, localCode } = useProductContext();

    const FindAdmin = admins.find(item => item.code === localCode);
    const FindUser = users.find(item => item.code === localCode);

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

            custom
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

        return custom
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
                        {users.map(item => (
                            <h3 key={item.name} onClick={() => xechnma(item.name)}>
                                {item.name}
                            </h3>
                        ))}
                    </div>
                ) : null}

                <div className="customerPlus" onClick={() => users.length >= 1 ? addCustomer(true) : alert("Iltimos oldin doktor qo'shing")}>
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
                    : custom.filter(item => item.doctorName === FindUser?.name && item.delate === true)
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
