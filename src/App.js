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

  const array = (localCode && localName) ? <Home /> : <Login />;

  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={array} />
        <Route path="/weit" element={<Weit />} />
        <Route path="/users" element={<Users />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
    </UserProvider>
  );
};

export default App;
