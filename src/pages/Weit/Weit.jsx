import "./Weit.css";
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Profile from "../../components/Profile";
import { getUsers } from "../../service/fireStoreDoctorService";
import { getCustomers, subscribeToCustomers } from "../../service/fireStoreCustomerService";
import Alert5 from "../../components/Alerts/WeitCustomerInfo";
import ReactPaginate from "react-paginate";
import { LuFilePenLine, LuFilterX } from "react-icons/lu";
import { subscribeToAdmins } from "../../service/fireStoreAdminService";
import { toast, ToastContainer } from "react-toastify";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiPlusCircle } from "react-icons/fi";

const Weitlist = () => {
    const PINcode = localStorage.getItem("PINcode")
    const [users, setUsers] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [firebaseAdmin, setFirebaseAdmin] = useState([])

    const FindAdmin = firebaseAdmin.find(item => item.code === PINcode)
    const FindUser = users.find(item => item.code === PINcode)

    const [filters, setFilters] = useState({
        id: "",
        name: "",
        doctor: "",
        status: "",
        sort: ""
    });

    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        const unsubscribe = subscribeToAdmins(setFirebaseAdmin);
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const unsubscribe = getUsers(setUsers);
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const unsubscribe = subscribeToCustomers((customerData) => {
            customerData.sort((a, b) => a.id - b.id);
            setCustomers(customerData);
            setFilteredCustomers(customerData);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        let filtered = customers.filter(item =>
            (filters.id === "" || item.id.toString().includes(filters.id)) &&
            (filters.name === "" || item.name.toLowerCase().includes(filters.name.toLowerCase())) &&
            (filters.doctor === "" || item.doctorName === filters.doctor) &&
            (filters.status === "" ||
                (filters.status === "kutayotgan" && item.complated && item.delate) ||
                (filters.status === "bekorqilindi" && !item.delate) ||
                (filters.status === "tugatildi" && !item.complated))
        );

        if (filters.sort === "alifbo") {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else if (filters.sort === "teskariAlifbo") {
            filtered.sort((a, b) => b.name.localeCompare(a.name));
        } else if (filters.sort === "id") {
            filtered.sort((a, b) => a.id - b.id);
        } else if (filters.sort === "teskariId") {
            filtered.sort((a, b) => b.id - a.id);
        }

        setFilteredCustomers(filtered);
        setCurrentPage(0);
    }, [filters, customers]);

    const [customerInfo, setCustomerInfo] = useState({});
    const [alert5Show, setAlert5Show] = useState(false);

    const alertShow = (item) => {
        setAlert5Show(true);
        setCustomerInfo(item);
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const filteredItems = FindUser ? filteredCustomers.filter(item => item.doctorName === FindUser.name) : filteredCustomers;
    const totalItems = filteredItems.length;
    const pageCount = totalItems > itemsPerPage ? Math.ceil(totalItems / itemsPerPage) : 1;
    const currentItems = filteredItems.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    const delateNotify = () => {
        toast.success(
            <div className="flex items-center justify-between w-full">
                <RiDeleteBin6Line size={25} color="#ff0000" />
                <span className="text-xl" style={{ color: "#ff0000" }}>O‘chirildi!</span>
            </div>,
            {
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                closeButton: false,
                icon: false,
                position: "top-right",
                progressClassName: "progressRedBackground"
            }
        );
    };

    const addNotify = () => {
        toast.success(
            <div className="flex items-center justify-between w-full">
                <FiPlusCircle size={25} color="#078625" />
                <span className="text-xl" style={{ color: "#078625" }}>Qo‘shildi!</span>
            </div>,
            {
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                closeButton: false,
                icon: false,
                position: "top-right",
                progressClassName: "progressGreenBackground"
            }
        );
    };

    const chengeNotify = () => {
        toast.success(
            <div className="flex items-center justify-between w-full">
                <LuFilePenLine size={25} color="#5f54fe" />
                <span className="text-xl" style={{ color: "#5f54fe" }}>O‘zgartirildi!</span>
            </div>,
            {
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                closeButton: false,
                icon: false,
                position: "top-right",
                progressClassName: "progressBlueBackground"
            }
        );
    };

    const completedNotify = () => {
        toast.success(
            <div className="flex items-center justify-between w-full">
                <FiPlusCircle size={25} color="#078625" />
                <span className="text-xl" style={{ color: "#078625" }}>Tugatildi!</span>
            </div>,
            {
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                closeButton: false,
                icon: false,
                position: "top-right",
                progressClassName: "progressGreenBackground"
            }
        );
    };


    return (
        <section className="weitlistPage">
            <Navbar />
            <div className="weitlistContainer">
                <div className="weitNavbar sticky top-0 z-10">
                    <h3>Barcha mijozlar: {customers.length} ta </h3>
                    <Profile />
                </div>
                <div className="weitCustomers">
                    <div className="weitTable">
                        <div className="filterNav">
                            <div className="filtered">
                                <select name="sort" onChange={handleFilterChange}>
                                    <option hidden>Tartiblash</option>
                                    <option value="">Barchasi</option>
                                    <option value="alifbo">Alifbo tartibida</option>
                                    <option value="teskariAlifbo">Teskari alifbo</option>
                                    <option value="id">ID bo‘yicha</option>
                                    <option value="teskariId">Teskari ID bo‘yicha</option>
                                </select>
                                <input type="text" name="id" placeholder="ID:" onChange={handleFilterChange} />
                                <input type="text" name="name" placeholder="Ism:" onChange={handleFilterChange} />

                                {FindAdmin ? <select name="doctor" onChange={handleFilterChange}>
                                    <option hidden>Shifokorlar</option>
                                    <option value="">Barchasi</option>
                                    {users.map(user => (
                                        <option key={user.id} value={user.name}>{user.name}</option>
                                    ))}
                                </select> : ""}

                                <select name="status" onChange={handleFilterChange}>
                                    <option hidden>Holati</option>
                                    <option value="">Hammasi</option>
                                    <option value="kutayotgan">Kutayotgan</option>
                                    <option value="bekorqilindi">Bekor qilingan</option>
                                    <option value="tugatildi">Tugatilgan</option>
                                </select>
                            </div>
                            <LuFilterX color="#fff" onClick={() => setFilters({ id: "", name: "", doctor: "", status: "", sort: "" })} />
                        </div>
                        <table className="usersFilter">
                            <thead>
                                <tr>
                                    <td>ID</td>
                                    <td>Ism</td>
                                    <td>Shifokor</td>
                                    <td>Holati</td>
                                </tr>
                            </thead>
                            <tbody>
                                {FindAdmin ? currentItems.map((item, index) => (
                                    <tr key={index} onClick={() => alertShow(item)} className="cursor-pointer one" style={{ background: index % 2 === 0 ? "#f7f7f7" : "#ececec" }}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.doctorName}</td>
                                        <td style={{ color: item.delate === false ? "red" : item.complated === false ? "green" : item.complated === true ? "orange" : "" }}>
                                            {item.delate === false ? "Bekor qilingan" : item.complated === true ? "Kutayotgan" : item.complated === false ? "Tugatilgan" : ""}
                                        </td>
                                    </tr>
                                )) : FindUser ? currentItems.filter(item => item.doctorName === FindUser.name).map((item, index) => (
                                    <tr key={index} onClick={() => alertShow(item)} className="cursor-pointer one" style={{ background: index % 2 === 0 ? "#f9f9f9" : "#ececec" }}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.doctorName}</td>
                                        <td style={{ color: item.delate === false ? "red" : item.complated === false ? "green" : item.complated === true ? "orange" : "" }}>
                                            {item.delate === false ? "Bekor qilingan" : item.complated === true ? "Kutayotgan" : item.complated === false ? "Tugatilgan" : ""}
                                        </td>
                                    </tr>
                                )) : ""}
                            </tbody>
                        </table>
                    </div>

                    <div className="controls">
                        {FindAdmin ? <p>Qatorlar soni: {currentItems.length} ta</p> : <p>Qatorlar soni: {totalItems} ta</p>}
                        {pageCount > 1 && (
                            <ReactPaginate
                                previousLabel="‹"
                                nextLabel="›"
                                breakLabel="..."
                                pageCount={pageCount}
                                marginPagesDisplayed={1}
                                pageRangeDisplayed={2}
                                onPageChange={handlePageClick}
                                containerClassName="pagination"
                                activeClassName="active"
                            />
                        )}
                    </div>
                </div>
                <ToastContainer />
            </div>

            {alert5Show && (
                FindAdmin ?
                    <div className="alertContainer">
                        <Alert5
                            ChengeNotify={chengeNotify}
                            cusInfo={customerInfo}
                            customer={customers}
                            alertShow={setAlert5Show}
                            CompletedNotify={completedNotify}
                            DelateNotify={delateNotify}
                            AddNotify={addNotify}
                        />
                    </div> : ""
            )}

        </section>
    );
};

export default Weitlist;
