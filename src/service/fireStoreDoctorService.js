// services/firestoreService.js
import { db } from "../firebase";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy } from "firebase/firestore";

// Foydalanuvchi qo'shish
export const addUser = async (userData) => {
    try {
        const docRef = await addDoc(collection(db, "users"), userData);
        return docRef.id;
    } catch (error) {
        console.error("Error adding user: ", error);
        throw error;
    }
};



// Foydalanuvchilarni o'qish
export const getUsers = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "users"));
        return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching users: ", error);
        throw error;
    }
};


// faqat Id si boyicha oqish
export const getUsersId = async () => {
    try {
        const q = query(collection(db, "users"), orderBy("id", "asc"));
        const querySnapshot = await getDocs(q);

        const customerIds = querySnapshot.docs.map(doc => doc.id);
        return customerIds;
    } catch (error) {
        console.error("Error fetching customer IDs: ", error);
        throw error;
    }
};



// Foydalanuvchini yangilash
export const updateUser = async (id, updatedData) => {
    try {
        const userDoc = doc(db, "users", id);
        await updateDoc(userDoc, updatedData);
    } catch (error) {
        console.error("Error updating user: ", error);
        throw error;
    }
};

// Foydalanuvchini o'chirish
export const deleteUser = async (id) => {
    try {
        const userDoc = doc(db, "users", id);
        await deleteDoc(userDoc);
    } catch (error) {
        console.error("Error deleting user: ", error);
        throw error;
    }
};