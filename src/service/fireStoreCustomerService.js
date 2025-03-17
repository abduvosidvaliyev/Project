// services/firestoreService.js
import { db } from "../firebase";
import { collection, query, where, getDocs, addDoc, doc, updateDoc, deleteDoc, orderBy, onSnapshot } from "firebase/firestore";

// Yangi mijoz qo‘shish
export const addCustomer = async (customerData) => {
    try {
        const customersRef = collection(db, "customers");
        const docRef = await addDoc(customersRef, customerData);
        
        return { id: docRef.id, ...customerData };
    } catch (error) {
        console.error("Error adding customer: ", error);
        throw error;
    }
};

// Foydalanuvchilarni o'qish (onSnapshot bilan)
export const subscribeToCustomers = (callback) => {
    const q = query(collection(db, "customers"));
    
    return onSnapshot(q, (querySnapshot) => {
        const customers = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));
        callback(customers);
    });
};

// Foydalanuvchilarni ID bo‘yicha olish (onSnapshot bilan)
export const subscribeToCustomerIds = (callback) => {
    const q = query(collection(db, "customers"), orderBy("id", "asc"));
    return onSnapshot(q, (querySnapshot) => {
        const customerIds = querySnapshot.docs.map(doc => doc.id);
        callback(customerIds);
    });
};

// Doktorga tegishli mijozlarni olish (onSnapshot bilan)
export const subscribeToCustomersByDoctorId = (doctorName, callback) => {
    const customersRef = collection(db, "customers");
    const q = query(customersRef, where("doctorName", "==", doctorName));
    return onSnapshot(q, (querySnapshot) => {
        const customers = querySnapshot.docs.map(doc => ({
            customerId: doc.id,
            ...doc.data()
        }));
        callback(customers);
    });
};

// Foydalanuvchini yangilash
export const updateCustomers = async (id, updatedData) => {
    try {
        const userDoc = doc(db, "customers", id);
        await updateDoc(userDoc, updatedData);
    } catch (error) {
        console.error("Error updating customer: ", error);
        throw error;
    }
};

// Foydalanuvchini o‘chirish
export const deleteCustomers = async (id) => {
    try {
        const userDoc = doc(db, "customers", id);
        await deleteDoc(userDoc);
    } catch (error) {
        console.error("Error deleting user: ", error);
        throw error;
    }
};

// Doktorga tegishli mijozlarni olish
export const getCustomersByDoctorId = (doctorName, callback) => {
    const customersRef = collection(db, "customers");
    const q = query(customersRef, where("doctorName", "==", doctorName));

    // **onSnapshot ishlatilmoqda va unsubscribe funksiyasini qaytaryapti**
    return onSnapshot(q, (snapshot) => {
        const customers = snapshot.docs.map(doc => ({
            customerId: doc.id,
            ...doc.data()
        }));
        callback(customers);
    });
};

