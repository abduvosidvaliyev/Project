import "../../style/AddCustomer.css"
import { useState } from "react"
import { IoClose } from "react-icons/io5"
import { RiDeleteBin5Fill } from "react-icons/ri"
import { MdLibraryAddCheck } from "react-icons/md"
import { addCustomer } from "../../service/fireStoreCustomerService"

const AddCustomer = ({ firebaseUser, firebaseCustomer, AddNotify, AddCustomers }) => {

    const [selectValue, setSelectValue] = useState("")
    const [customerName, setCustomerName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    console.log(firebaseUser);
    
    
    const AddCustomer = async () => {        
        if (!selectValue || !customerName || !phoneNumber) {
            alert("Barcha joylarni to'ldiring");
            return;
        }

        AddCustomers(false);
        AddNotify()
        
        const newCustomer = {
            id: firebaseCustomer.length + 1,
            name: customerName,
            doctorName: selectValue,
            number: phoneNumber,
            delate: true,
            complated: true,
            createdAt: new Date()
        };

        try {
            await addCustomer(newCustomer);
        } catch (error) {
            console.error("Failed to add user:", error);
        }

    };

    return (
        <div className="customerContainer">
            <div className="addCustomer">
                <div className="customerTop">
                    <div className="title">
                        <h3>
                            Mijoz qo'shish
                        </h3>
                        <IoClose onClick={() => AddCustomers(false)} />
                    </div>
                    <div className="inputs inp">
                        <input onChange={(e) => setCustomerName(e.target.value)} type="text" placeholder="Mijoz ism Familiyasi" />
                        <input onChange={(e) => setPhoneNumber(e.target.value)} type="text" placeholder="Telefon raqami" />
                        <select style={{ color: selectValue === "" ? "#a5b1c1" : "#000" }} onChange={(e) => setSelectValue(e.target.value)} >
                            <option value="" hidden={true}>Kimga biriktiriladi</option>
                            {
                                (firebaseUser || []).map(item =>
                                    <option value={item.name}>{item.name}</option>
                                )
                            }
                        </select>
                        <h3>
                            Bundan oldingi mijozlar soni: {firebaseCustomer.length}
                        </h3>
                    </div>
                </div>
                <div className="customerButtons">
                    <button
                        onClick={() => AddCustomers(false)}
                        style={{ background: "#ff1216" }}
                    >
                        Bekor qilish <RiDeleteBin5Fill />
                    </button>
                    <button onClick={AddCustomer} style={{ background: "#078625" }}>Qo'shish <MdLibraryAddCheck /></button>
                </div>
            </div>
        </div>
    )
}

export default AddCustomer