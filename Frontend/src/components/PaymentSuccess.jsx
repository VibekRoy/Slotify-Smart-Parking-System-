import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const verifyPayment = async () => {
      const sessionId = new URLSearchParams(window.location.search).get(
        "session_id"
      );
      if (!sessionId) {
        navigate("/cancel");
        return;
      }

      try {
        // Send session_id to backend for payment verification
        const apiURL = import.meta.env.VITE_API_URL;
        const response = await axios.post(
          `${apiURL}/slots/confirm`,
          { sessionId },
          { withCredentials: true }
        );

        if (response.status === 200) {
          navigate("/success");
        } else {
          navigate("/cancel");
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
        navigate("/cancel");
      }
    };

    verifyPayment();
  }, [navigate]);

  return null;
};

export default PaymentSuccess;
