import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import About from "../pages/About";
import LoginDashboard from "../pages/LoginDashboard";
import FindParking from "../pages/FindParking";
import { LoadScript } from "@react-google-maps/api";

function App() {
  const location = useLocation();
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/signup";
  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div className=" h-screen font-sans flex flex-col">
        {!hideNavbar && <Navbar />}
        <Routes>
          <Route path="/dashboard" element={<LoginDashboard />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/find" element={<FindParking />} />
        </Routes>
      </div>
    </LoadScript>
  );
}

export default App;
