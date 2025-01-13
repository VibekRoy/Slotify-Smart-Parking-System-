import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import About from "../pages/About";
import LoginDashboard from "../components/LoginDashboard";

function App() {
  const location = useLocation();
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/signup";
  return (
    <div className=" h-screen font-sans ">
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/dashboard" element={<LoginDashboard />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
