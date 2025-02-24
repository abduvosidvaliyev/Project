// services/firestoreService.js
import { db } from "../firebase";
import { 
    collection, addDoc, doc, updateDoc, deleteDoc, query, orderBy, where, 
    onSnapshot
} from "firebase/firestore";

// Adminlar uchun xuddi shunday funksiyalar
export const addAdmin = async (userData) => {
    try {
        const docRef = await addDoc(collection(db, "admins"), userData);
        return docRef.id;
    } catch (error) {
        console.error("Error adding admin: ", error);
        throw error;
    }
};


export const subscribeToAdmins = (callback) => {
    const q = query(collection(db, "admins"));
    return onSnapshot(q, (querySnapshot) => {
        const admins = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        callback(admins);
    });
};


export const subscribeToAdminIds = (callback) => {
    const q = query(collection(db, "admins"), orderBy("id", "asc"));
    return onSnapshot(q, (querySnapshot) => {
        const adminIds = querySnapshot.docs.map(doc => doc.id);
        callback(adminIds);
    });
};


export const updateAdmin = async (id, updatedData) => {
    try {
        const adminDoc = doc(db, "admins", id);
        await updateDoc(adminDoc, updatedData);
    } catch (error) {
        console.error("Error updating admin: ", error);
        throw error;
    }
};


export const deleteAdmin = async (id) => {
    try {
        const adminDoc = doc(db, "admins", id);
        await deleteDoc(adminDoc);
    } catch (error) {
        console.error("Error deleting admin: ", error);
        throw error;
    }
};
