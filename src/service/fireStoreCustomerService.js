// services/firestoreService.js
import { db } from "../firebase";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, orderBy, query } from "firebase/firestore";

// Foydalanuvchi qo'shish
export const addCustomers = async (userData) => {
    try {
        const docRef = await addDoc(collection(db, "customers"), userData);
        return docRef.id;
    } catch (error) {
        console.error("Error adding user: ", error);
        throw error;
    }
};



// Foydalanuvchilarni o'qish
export const getCustomers = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "customers"));
        
        const customers = querySnapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data()
            };
        });

        return customers;
    } catch (error) {
        console.error("Error fetching users: ", error);
        throw error;
    }
};



// Foydalanuvchilarni o'qish faqat ID'lar bilan
export const getCustomerIds = async () => {
    try {
        const q = query(collection(db, "customers"), orderBy("id", "asc"));
        const querySnapshot = await getDocs(q);

        const customerIds = querySnapshot.docs.map(doc => doc.id);
        return customerIds;
    } catch (error) {
        console.error("Error fetching customer IDs: ", error);
        throw error;
    }
};


// Foydalanuvchini yangilash
export const updateCustomers = async (id, updatedData) => {
    try {
        const userDoc = doc(db, "customers", id);
        await updateDoc(userDoc, updatedData);
    } catch (error) {
        console.error("Error updating user: ", error);
        throw error;
    }
};

// Foydalanuvchini o'chirish
export const deleteCustomers = async (id) => {
    try {
        const userDoc = doc(db, "customers", id);
        await deleteDoc(userDoc);
    } catch (error) {
        console.error("Error deleting user: ", error);
        throw error;
    }
};