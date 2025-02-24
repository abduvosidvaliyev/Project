// services/firestoreService.js
import { db } from "../firebase";
import { collection, addDoc, doc, updateDoc, deleteDoc, query, orderBy, where, onSnapshot, Timestamp } from "firebase/firestore";

// ✅ Foydalanuvchi qo‘shish
export const addUser = async (userData) => {
    try {
        const docRef = await addDoc(collection(db, "users"), userData);
        return docRef.id;
    } catch (error) {
        console.error("Error adding user: ", error);
        throw error;
    }
};

// ✅ Foydalanuvchilarni olish (real vaqt rejimida)
export const getUsers = (callback) => {
    try {
        const usersRef = collection(db, "users");
        return onSnapshot(usersRef, (snapshot) => {
            const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            callback(users); // Callback orqali yangilangan ma'lumotlar jo‘natiladi
        });
    } catch (error) {
        console.error("Error fetching users: ", error);
    }
};

// ✅ Faqat ID larni olish (real vaqt rejimida)
export const getUsersId = (callback) => {
    try {
        const q = query(collection(db, "users"), orderBy("id", "asc"));
        return onSnapshot(q, (snapshot) => {
            const customerIds = snapshot.docs.map(doc => doc.id);
            callback(customerIds);
        });
    } catch (error) {
        console.error("Error fetching customer IDs: ", error);
        throw error;
    }
};

// ✅ Foydalanuvchini yangilash
export const updateUser = async (id, updatedData) => {
    try {
        const userDoc = doc(db, "users", id);
        await updateDoc(userDoc, updatedData);
    } catch (error) {
        console.error("Error updating user: ", error);
        throw error;
    }
};

// ✅ Foydalanuvchini o‘chirish
export const deleteUser = async (id) => {
    try {
        const userDoc = doc(db, "users", id);
        await deleteDoc(userDoc);
    } catch (error) {
        console.error("Error deleting user: ", error);
        throw error;
    }
};

// ✅ Statistikani olish (real vaqt rejimida)

export const getCustomersByDoctor = (doctorId, filterType, callback) => {
    try {
        let startDate = new Date();
        let endDate = new Date();

        if (filterType === "daily") {
            startDate.setHours(0, 0, 0, 0);
            endDate.setHours(23, 59, 59, 999);
        } else if (filterType === "weekly") {
            startDate.setDate(startDate.getDate() - 7);
        } else if (filterType === "monthly") {
            startDate.setMonth(startDate.getMonth() - 1);
        } else if (filterType === "yearly") {
            startDate.setFullYear(startDate.getFullYear() - 1);
        }

        const customersRef = collection(db, "customers");
        const q = query(
            customersRef,
            where("doctorId", "==", doctorId),
            where("time", ">=", Timestamp.fromDate(startDate)), 
            where("time", "<=", Timestamp.fromDate(endDate))
        );

        return onSnapshot(q, (snapshot) => {
            const customers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            console.log(`📊 ${doctorId} uchun mijozlar:`, customers);
            callback(customers);
        });
    } catch (error) {
        console.error("Mijozlarni olishda xatolik:", error);
    }
};
