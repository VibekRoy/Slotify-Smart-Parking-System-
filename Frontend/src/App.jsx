import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import LoginDashboard from "./pages/LoginDashboard";
import FindParking from "./pages/FindParking";
import { LoadScript } from "@react-google-maps/api";
import PaymentSuccess from "./components/PaymentSuccess";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import { ToastContainer } from "react-toastify";
import History from "./pages/History";

function App() {
  const location = useLocation();
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/signup";
  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div className=" h-screen font-sans flex flex-col scroll-smooth">
        <ToastContainer />
        {!hideNavbar && <Navbar />}
        <Routes>
          <Route path="/dashboard" element={<LoginDashboard />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/history" element={<History />} />
          <Route path="/find" element={<FindParking />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
        </Routes>
      </div>
    </LoadScript>
  );
}

export default App;
