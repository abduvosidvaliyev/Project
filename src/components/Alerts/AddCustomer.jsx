import "../../style/AddCustomer.css"
import { useState } from "react"
import { IoClose } from "react-icons/io5"
import { RiDeleteBin5Fill } from "react-icons/ri"
import { MdLibraryAddCheck } from "react-icons/md"
import { addCustomers } from "../../service/fireStoreCustomerService"

const AddCustomer = ({ firebaseUser, firebaseCustomer, addCustomer }) => {

    const [selectValue, setSelectValue] = useState("")
    const [customerName, setCustomerName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    const AddCustomer = async () => {
        if (!selectValue || !customerName || !phoneNumber) {
            alert("Barcha joylarni to'ldiring")
            return;
        }

        const newId = firebaseCustomer.length + 1;

        try {
            await addCustomers({
                id: newId,
                name: customerName,
                doctorName: selectValue,
                number: phoneNumber,
                delate: true,
                complated: true,
                createdAt: new Date()
            });
        } catch (error) {
            console.error("Failed to add user:", error);
        }

        addCustomer(false)
    };

    return (
        <div className="customerContainer">
            <div className="addCustomer">
                <div className="customerTop">
                    <div className="title">
                        <h3>
                            Mijoz qo'shish
                        </h3>
                        <IoClose onClick={() => addCustomer(false)} />
                    </div>
                    <div className="inputs inp">
                        <input onChange={(e) => setCustomerName(e.target.value)} type="text" placeholder="Mijoz ism Familiyasi" />
                        <input onChange={(e) => setPhoneNumber(e.target.value)} type="text" placeholder="Telefon raqami" />
                        <select style={{ color: selectValue === "" ? "#a5b1c1" : "#000" }} onChange={(e) => setSelectValue(e.target.value)} name="" id="">
                            <option value="" hidden={true}>Kimga biriktiriladi</option>
                            {
                                firebaseUser.map(item =>
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
                        onClick={() => addCustomer(false)}
                        style={{ background: "#ff1216" }}
                    >
                        O'chirish <RiDeleteBin5Fill />
                    </button>
                    <button onClick={AddCustomer} style={{ background: "#078625" }}>Tugatish <MdLibraryAddCheck /></button>
                </div>
            </div>
        </div>
    )
}

export default AddCustomer