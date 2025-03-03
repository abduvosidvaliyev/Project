import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Statistics from "./pages/Statistics/Statistics";
import Users from "./pages/Users/Users";
import Weit from "./pages/Weit/Weit";
import { UserProvider } from "./Context/Context";

const App = () => {
  const localCode = localStorage.getItem("PINcode");
  const localName = localStorage.getItem("UserName");

  const isAuthenticated = localCode && localName;

  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
        <Route path="/weit" element={isAuthenticated ? <Weit /> : <Login />} />
        <Route path="/users" element={isAuthenticated ? <Users /> : <Login />} />
        <Route path="/statistics" element={isAuthenticated ? <Statistics /> : <Login />} />
      </Routes>
    </UserProvider>
  );
};

export default App;
