import "./Statistics.css";
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Profile from "../../components/Profile";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, } from "recharts";
import { subscribeToCustomers } from "../../service/fireStoreCustomerService";
import { getUsers } from "../../service/fireStoreDoctorService";

const Statistics = () => {
    const [doctor, setDoctor] = useState([])
    const [customer, setCustomer] = useState([])
    const [filter, setFilter] = useState("monthly");

    useEffect(() => {
        const unsubscribe = getUsers(setDoctor);
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const unsubscribe = subscribeToCustomers(setCustomer);
        return () => unsubscribe();
    }, []);

    const filterDataByDoctor = (doctorName) => {
        return customer.filter((entry) => entry.name === doctorName);
    };

    const getFilteredData = (data) => {
        const groupedData = {};
        const currentDate = new Date();
        let periods = [];

        if (filter === "yearly") {
            for (let i = 11; i >= 0; i--) {
                const date = new Date(currentDate);
                date.setMonth(currentDate.getMonth() - i);
                periods.push(date.toLocaleString("default", { month: "long", year: "numeric" }));
            }
        } else if (filter === "monthly") {
            for (let i = 30; i >= 0; i--) {
                const date = new Date(currentDate);
                date.setDate(currentDate.getDate() - i);
                periods.push(date.toLocaleString("default", { day: "numeric", month: "long" }));
            }
        } else if (filter === "weekly") {
            for (let i = 14; i >= 0; i--) {
                const date = new Date(currentDate);
                date.setDate(currentDate.getDate() - i);
                periods.push(date.toLocaleString("default", { weekday: "long", month: "long", day: "numeric" }));
            }
        }

        periods.forEach((period) => {
            groupedData[period] = 0;
        });

        data.forEach((entry) => {
            const date = new Date(entry.created_at);
            const period = date.toLocaleString("default", {
                year: filter === "yearly" ? "numeric" : undefined,
                month: "long",
                day: filter === "monthly" ? "numeric" : undefined,
                weekday: filter === "weekly" ? "long" : undefined,
            });
            if (periods.includes(period)) {
                groupedData[period]++;
            }
        });

        return periods.map((period) => ({
            period,
            value: groupedData[period],
        }));
    };

    return (
        <section className="Statistics">
            <Navbar />
            <div className="statisticsContainer">
                <div className="statisticsNavbar">
                    <h3>Barcha analizlar</h3>
                    <Profile />
                </div>
                <div className="filterButtons">
                    <button onClick={() => setFilter("yearly")}>Yillik</button>
                    <button onClick={() => setFilter("monthly")}>Oylik</button>
                    <button onClick={() => setFilter("weekly")}>Haftalik</button>
                </div>
                <div className="statistics">
                    <div className="allAnalysis flex justify-start items-start gap-5">
                        <h3>Korxonaning barcha analizlari</h3>
                        <ResponsiveContainer width="100%" height={350}>
                            <LineChart data={getFilteredData(customer)}>
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="dodgerblue"
                                />
                                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                <XAxis dataKey="period" />
                                <YAxis />
                                <Tooltip />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="userCharts">
                        {doctor.map((doctor, index) => {
                            const doctorData = filterDataByDoctor(doctor.name);
                            const filteredData = getFilteredData(doctorData);
                            return (
                                <div className="allUserAnalytics" key={index}>
                                    <h4>{doctor.name}</h4>
                                    <ResponsiveContainer width="100%" height={350}>
                                        <LineChart data={filteredData}>
                                            <Line
                                                type="monotone"
                                                dataKey="value"
                                                stroke={index % 2 === 0 ? "dodgerblue" : "green"}
                                            />
                                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                            <XAxis dataKey="period" />
                                            <YAxis />
                                            <Tooltip />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Statistics;