import { RiDeleteBin5Fill } from "react-icons/ri";
import "../../style/Alert5.css";
import { IoClose } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { MdLibraryAddCheck } from "react-icons/md";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { getCustomerIds } from "../../service/fireStoreCustomerService";
import { useEffect, useState } from "react";
import { HiArrowPath } from "react-icons/hi2";
import Alert6 from "./WeitChengeCustomerInfo";

const Alert5 = ({ cusInfo, customer, alertShow }) => {
    const [customerIds, setCustomerIds] = useState([]);
    const [cusArray, setCusArray] = useState([]);
    const [alert2Show, setalert2Show] = useState(false);

    useEffect(() => {
        setCusArray(customer.filter(item => item.complated === true && item.delate === true));
    }, [customer]); 

    useEffect(() => {
        const fetchCustomerIds = async () => {
            try {
                const ids = await getCustomerIds();
                setCustomerIds(ids);
            } catch (error) {
                console.error("Failed to fetch customer IDs:", error);
            }
        };
        fetchCustomerIds();
    }, []);

    const deleteCustomer = async (customerInfo) => {
        try {
            const customerDocId = customerIds.find((id) => id === customerInfo);
            if (!customerDocId) {
                console.error("Mijoz ID si topilmadi");
                return;
            }
            const doctorRef = doc(db, "customers", customerDocId);
            await updateDoc(doctorRef, { delate: false });
            alertShow(false);
        } catch (error) {
            console.error("Xatolik yuz berdi:", error);
        }
    };

    const complatedCustomer = async (customerInfo) => {
        try {
            const customerDocId = customerIds.find((id) => id === customerInfo);
            if (!customerDocId) {
                console.error("Mijoz ID si topilmadi");
                return;
            }
            const doctorRef = doc(db, "customers", customerDocId);
            await updateDoc(doctorRef, { complated: false });
            alertShow(false);
        } catch (error) {
            console.error("Xatolik yuz berdi:", error);
        }
    };

    const reyloadCustomer1 = async (customerInfo) => {
        try {
            const customerDocId = customerIds.find((id) => id === customerInfo);
            if (!customerDocId) {
                console.error("Mijoz ID si topilmadi");
                return;
            }
            const doctorRef = doc(db, "customers", customerDocId);
            await updateDoc(doctorRef, { complated: true });
            alertShow(false);
        } catch (error) {
            console.error("Xatolik yuz berdi:", error);
        }
    };

    const reyloadCustomer2 = async (customerInfo) => {
        try {
            const customerDocId = customerIds.find((id) => id === customerInfo);
            if (!customerDocId) {
                console.error("Mijoz ID si topilmadi");
                return;
            }
            const doctorRef = doc(db, "customers", customerDocId);
            await updateDoc(doctorRef, { complated: true, delate: true });
            alertShow(false);
        } catch (error) {
            console.error("Xatolik yuz berdi:", error);
        }
    };

    const formatDate = (timestamp) => {
        if (timestamp && timestamp.seconds) {
            return new Date(timestamp.seconds * 1000).toLocaleDateString();
        }
        return "Noma'lum";
    };

    return (
        <>
            {!alert2Show ? (
                <div className="Alert5">
                    <div className="title">
                        <h3>
                            {!cusInfo.delate
                                ? "Bekor qilingan mijoz"
                                : cusInfo.complated
                                ? "Kutayotgan mijoz"
                                : !cusInfo.complated
                                ? "Tugatilgan mijoz"
                                : ""}
                        </h3>
                        <IoClose onClick={() => alertShow(false)} />
                    </div>
                    <div className="cusInfo">
                        <h3>Id: {cusInfo.id}</h3>
                        <h3>Mijoz: {cusInfo.name}</h3>
                        <h3>Doktor: {cusInfo.doctorName}</h3>
                        <h3>Tel: {cusInfo.number}</h3>
                        <h3>Qachon ro'yhatdan o'tgan: {formatDate(cusInfo.createdAt)}</h3>
                        <h3>Bundan oldingi mijozlar soni: {cusArray.filter(item => item.id < cusInfo.id).length}</h3>
                    </div>
                    {!cusInfo.delate ? (
                        <button onClick={() => reyloadCustomer2(cusInfo.id)} className="reyload">
                            Qayta ishga tushurish <HiArrowPath />
                        </button>
                    ) : cusInfo.complated ? (
                        <div className="weitButtons">
                            <button onClick={() => deleteCustomer(cusInfo.id)} style={{ background: "#ff1216" }}>
                                Bekor qilish <RiDeleteBin5Fill />
                            </button>
                            <button onClick={() => setalert2Show(true)} style={{ background: "#5f53fe" }}>
                                O'zgartirish <CiEdit />
                            </button>
                            <button onClick={() => complatedCustomer(cusInfo.id)} style={{ background: "#078625" }}>
                                Tugatish <MdLibraryAddCheck />
                            </button>
                        </div>
                    ) : !cusInfo.complated ? (
                        <button onClick={() => reyloadCustomer1(cusInfo.id)} className="reyload">
                            Yana bir bor yozish <HiArrowPath />
                        </button>
                    ) : (
                        ""
                    )}
                </div>
            ) : (
                <Alert6 cusInfo={cusInfo} alertShow={alertShow} alert2Show={setalert2Show} />
            )}
        </>
    );
};

export default Alert5;
