import "./Statistics.css";
import Navbar from "../Navbar/Navbar";
import Profile from "../../components/Profile";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { useEffect, useState } from "react";
import { getUsers, getCustomersByDoctor } from "../../service/fireStoreDoctorService";

const Statistics = () => {
    const [doctors, setDoctors] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [filterType, setFilterType] = useState("daily");

    useEffect(() => {
        const unsubscribeDoctors = getUsers((doctorsData) => {
            setDoctors(doctorsData);
        });

        return () => unsubscribeDoctors && unsubscribeDoctors(); 
    }, []);



    useEffect(() => {
        if (doctors.length === 0) return;

        const unsubscribeList = [];

        doctors.forEach((doctor) => {
            const unsubscribe = getCustomersByDoctor(doctor.id, filterType, (data) => {
                setCustomers(prevCustomers => {
                    const filtered = prevCustomers.filter(c => c.doctorId !== doctor.id);
                    return [...filtered, ...data];
                });
            });
            
            unsubscribeList.push(unsubscribe);
        });

        return () => unsubscribeList.forEach(unsub => unsub && unsub()); 
    }, [doctors, filterType]);

    

    const groupByHour = (customers) => {
        const result = [];
        for (let hour = 0; hour < 24; hour++) {
            const count = customers.filter(c => new Date(c.time).getHours() === hour).length;
            result.push({ name: `${hour}:00`, value: count });
        }
        console.log(customers)       
        return result;

    };

    return (
        <section className="Statistics">
            <Navbar />
            <div className="statisticsContainer">
                <div className="statisticsNavbar">
                    <h3>Barcha analizlar</h3>
                    <Profile doctors={doctors} />
                </div>
                <div className="statistics">
                    <div className="allAnalysis">
                        <div className="catigor">
                            <h3>Korxonaning barcha analizlari</h3>
                            <div className="date">
                                <h3 onClick={() => setFilterType("daily")}>Kunlik</h3>
                                <h3 onClick={() => setFilterType("weekly")}>Haftalik</h3>
                                <h3 onClick={() => setFilterType("monthly")}>Oylik</h3>
                                <h3 onClick={() => setFilterType("yearly")}>Yillik</h3>
                            </div>
                        </div>
                        <ResponsiveContainer width="100%" height={350}>
                            <LineChart data={groupByHour(customers)}>
                                <Line type="monotone" dataKey="value" stroke="#37bcb9" />
                                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="userCharts">
                        {doctors.map((doctor, index) => {
                            const doctorCustomers = customers.filter(c => c.doctorId === doctor.id);
                            const hourlyData = groupByHour(doctorCustomers);

                            return (
                                <div className="allUserAnalytics" key={index}>
                                    <div className="catigor">
                                        <h3>Shifokor: {doctor.name}</h3>
                                    </div>
                                    <ResponsiveContainer width="100%" height={350}>
                                        <BarChart data={hourlyData}>
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Bar dataKey="value" fill={index % 2 === 0 ? "dodgerblue" : "green"} />
                                        </BarChart>
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
