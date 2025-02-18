import React, { createContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [id, setId] = useState(null);
    const [alert4Show, setAlert4Show] = useState(false);

    return (
        <UserContext.Provider value={{ id, setId, alert4Show, setAlert4Show }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
