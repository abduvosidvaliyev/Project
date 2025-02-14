import "./Statistics.css";
import Navbar from "../Navbar/Navbar";
import Profile from "../../components/Profile";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { useEffect, useState } from "react";
import { getUsers } from "../../service/fireStoreDoctorService";


const Statistics = () => {

    const [user, setUsers] = useState([])

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

    const data = [
        { name: '0', value: 50 },
        { name: '1', value: 20 },
        { name: '2', value: 100 },
        { name: '3', value: 200 },
        { name: '4', value: 180 },
        { name: '5', value: 190 },
        { name: '6', value: 80 },
        { name: '7', value: 30 },
        { name: '8', value: 110 },
        { name: '9', value: 120 },
        { name: '11', value: 170 },
        { name: '13', value: 20 },
        { name: '17', value: 140 },
        { name: '19', value: 200 },
        { name: '25', value: 90 },
        { name: '27', value: 40 },
        { name: '29', value: 160 }
    ];

    const date = [
        { name: "0", uv: 400, pv: 2400, amt: 2400 },
        { name: "1", uv: 300, pv: 1398, amt: 2210 },
        { name: "2", uv: 200, pv: 9800, amt: 2290 },
        { name: "3", uv: 278, pv: 3908, amt: 2000 },
        { name: "4", uv: 189, pv: 4800, amt: 2181 },
        { name: "5", uv: 239, pv: 3800, amt: 2500 },
        { name: "6", uv: 349, pv: 4300, amt: 2100 },
    ];
    return (
        <section className="Statistics">
            <Navbar />
            <div className="statisticsContainer">
                <div className="statisticsNavbar">
                    <h3>Barcha analizlar</h3>
                    <Profile />
                </div>
                <div className="statistics">
                    <div className="allAnalysis">
                        <div className="catigor">
                            <h3>Korxonaning barcha analizlari</h3>
                            <div className="date">
                                <h3>Kunlik</h3>
                                <h3>Haftalik</h3>
                                <h3>Oylik</h3>
                            </div>
                        </div>
                        <ResponsiveContainer width="100%" height={350}>
                            <LineChart data={date}>
                                <Line type="monotone" dataKey="uv" stroke="#37bcb9" />
                                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="userCharts">
                        {user.sort((a, b) => a.id - b.id).map((item, index) =>
                            <div className="allUserAnalytics">
                                <div className="catigor">
                                    <h3>Hodim {item.id}</h3>
                                    <div className="date">
                                        <h3>Kunlik</h3>
                                        <h3>Haftalik</h3>
                                        <h3>Oylik</h3>
                                    </div>
                                </div>
                                <ResponsiveContainer key={index} width="100%" height={350}>
                                    <BarChart data={data}>
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="value" fill={item.id % 2 === 1 ? "dodgerblue" : "green"} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section >
    );
};

export default Statistics;
