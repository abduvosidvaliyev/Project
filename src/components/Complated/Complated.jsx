import "./Complated.css"
import { useEffect, useState } from "react"
import { subscribeToCustomers } from "../../service/fireStoreCustomerService";

const Complated = ({ width2, firebaseDoctor, firebaseAdmin }) => {
    
    const PINcode = localStorage.getItem("PINcode")

    const [FirebaseCustomers, setFirebaseCustomers] = useState([])
    const FirebaseDoctor = firebaseDoctor.find(item => item.code === PINcode)
    const FirebaseAdmin = firebaseAdmin.find(item => item.code === PINcode)
    
    useEffect(() => {
        const unsubscribe = subscribeToCustomers(setFirebaseCustomers);
        return () => unsubscribe();  
    }, []);

    return (
        <section className="Complated" style={{ width: width2 }}>
            <div className="complated">
                <h3>
                    Tugatildi
                </h3>
            </div>
            <div className="complatedUser flex-wrap">
                {
                    FirebaseAdmin ? FirebaseCustomers.filter(item => item.complated === false)
                        .map((item, index) =>
                            <div className="complatedChild" key={index}>
                                <div className="filterComplated">
                                    <span>
                                        Id: {item.id}
                                    </span>
                                    <p style={{ color: "#0d8415" }}>
                                        Complated
                                    </p>
                                </div>
                                <h5>
                                    Mijoz: {item.name}
                                </h5>
                            </div>
                        ) : FirebaseCustomers.filter(item => item.doctorName === FirebaseDoctor.name && item.complated === false)
                            .map((item, index) =>
                                <div className="complatedChild" key={index}>
                                    <div className="filterComplated">
                                        <span>
                                            Id: {item.id}
                                        </span>
                                        <p style={{ color: "#0d8415" }}>
                                            Complated
                                        </p>
                                    </div>
                                    <h5>
                                        Mijoz: {item.name}
                                    </h5>
                                </div>
                            )
                }
            </div>
        </section>
    )
}

export default Complated