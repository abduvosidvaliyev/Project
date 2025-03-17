import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { createContext, useContext, useEffect, useState } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [id, setId] = useState(null);
  const [alert4Show, setAlert4Show] = useState(false);
  const [loading, setLoading] = useState({
    users: true,
    admins: true,
    custom: true,
  });

  const localCode = localStorage.getItem("PINcode");
  // const localCode = "salom"


  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [custom, setCustom] = useState([]);

  // Yuklash holatini yangilash funksiyasi
  const updateLoading = (key, value) => {
    setLoading((prev) => ({ ...prev, [key]: value }));
  };

  // Barcha ma'lumotlarni yuklash
  useEffect(() => {
    if (!localCode) return;

    // Users ma'lumotlarini yuklash
    const unsubscribeUsers = onSnapshot(collection(db, "users"), (snapshot) => {
      setUsers(snapshot.docs.map((doc) => ({ doc_id: doc.id, ...doc.data() })));
      updateLoading("users", false);
    });

    // Admins ma'lumotlarini yuklash
    const unsubscribeAdmins = onSnapshot(collection(db, "admins"), (snapshot) => {
      setAdmins(snapshot.docs.map((doc) => ({ admin_id: doc.id, ...doc.data() })));
      updateLoading("admins", false);
    });

    // Customers ma'lumotlarini yuklash
    const unsubscribeCustomers = onSnapshot(collection(db, "customers"), (snapshot) => {
      setCustom(snapshot.docs.map((doc) => ({ customer_id: doc.id, ...doc.data() })));
      updateLoading("custom", false);
    });

    return () => {
      unsubscribeUsers();
      unsubscribeAdmins();
      unsubscribeCustomers();
    };
  }, [localCode]);

  return (
    <ProductContext.Provider
      value={{
        id,
        setId,
        alert4Show,
        setAlert4Show,
        localCode,
        users,
        admins,
        custom,
        loading,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);
