import "./Weit.css";
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Profile from "../../components/Profile";
import { getUsers } from "../../service/fireStoreDoctorService";
import { getCustomers } from "../../service/fireStoreCustomerService";
import Alert5 from "../../components/Alerts/WeitCustomerInfo";
import ReactPaginate from "react-paginate";
import { LuFilterX } from "react-icons/lu";
import { getAdmin } from "../../service/fireStoreAdminService";

const Weitlist = () => {
    const PINcode = JSON.parse(localStorage.getItem("PINcode"))
    const [users, setUsers] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [firebaseAdmin, setFirebaseAdmin] = useState([])

    const FindAdmin = firebaseAdmin.find(item => item.code === PINcode)
    const FindUser = users.find(item => item.code === PINcode)

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
    }, []);

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
        const fetchUsers = async () => {
            try {
                const usersData = await getUsers();
                setUsers(usersData);
            } catch (error) {
                console.error("Failed to fetch users:", error);
            }
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const customerData = await getCustomers();
                customerData.sort((a, b) => a.id - b.id);
                setCustomers(customerData);
                setFilteredCustomers(customerData);
            } catch (error) {
                console.error("Failed to fetch customers:", error);
            }
        };
        fetchCustomers();
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

    return (
        <section className="weitlistPage">
            <Navbar />
            <div className="weitlistContainer">
                <div className="weitNavbar sticky top-0 z-10">
                    <h3>Bugungi kunlik barcha mijozlar: {customers.length} ta </h3>
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
                                    <tr key={index} onClick={() => alertShow(item)} className="cursor-pointer one" style={{ background: index % 2 === 0 ? "#f7f7f7" : "#ececec" }}>
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
            </div>

            {alert5Show && (
                FindAdmin ? <div className="alertContainer">
                    <Alert5 cusInfo={customerInfo} customer={customers} alertShow={setAlert5Show} />
                </div> : ""
            )}

        </section>
    );
};

export default Weitlist;
