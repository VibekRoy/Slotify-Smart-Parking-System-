import "../styles/Navbar.css";
import { FaHistory, FaSearch } from "react-icons/fa";
import { HiHome } from "react-icons/hi2";
// import { IoIosInformationCircle } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import useUserAuth from "../utils/useAuth";
import axios from "axios";
function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, userName, logout } = useUserAuth();
  const apiUrl = import.meta.env.VITE_API_URL;
  const handleClick = async () => {
    if (isAuthenticated) {
      await axios.post(`${apiUrl}/auth/logout`, {}, { withCredentials: true });
      logout();
      navigate("/login");
    } else navigate("/login");
  };
  return (
    <div className="text-md  flex items-center justify-between px-8 py-4 h-[8%]">
      <div className="w-[200px] cursor-pointer" onClick={() => navigate("/")}>
        <img src="assets/logo.png" alt="Slotify-Logo" />
      </div>
      <div className="flex items-center  text-zinc-950">
        <div className="nav-item" onClick={() => navigate("/")}>
          <HiHome className="text-2xl" />
          Home
        </div>
        <div className="nav-item" onClick={() => navigate("/find")}>
          <FaSearch className="text-xl" />
          Find Parking
        </div>
        <div className="nav-item" onClick={() => navigate("/history")}>
          <FaHistory />
          History
        </div>
        {/* <div className="nav-item" onClick={() => navigate("/about")}>
          <IoIosInformationCircle className="text-2xl" />
          About Us
        </div> */}
        <div className="nav-item" onClick={() => navigate("/login")}>
          <CgProfile className="text-2xl" />
          {isAuthenticated ? userName : "Profile"}
        </div>
      </div>
      <div>
        <div className="login-button" onClick={handleClick}>
          {isAuthenticated ? "Logout" : "Login/Signup"}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
