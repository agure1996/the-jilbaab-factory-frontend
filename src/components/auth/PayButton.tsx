import axios from "axios";
import { useSelector } from "react-redux";
import { url } from "../../redux/slices/Api";

interface PayButtonProps {
  items: any[];
}

const PayButton: React.FC<PayButtonProps> = ({ items }) => {
  const user = useSelector((state: any) => state.auth);

  const handleCheckout = async () => {
    if (!items || !Array.isArray(items) || items.length === 0) {
      console.error("Invalid items array");
      return;
    }

    const payload = {
      cartItems: items,
      userId: user?._id, 
    };

    try {
      const response = await axios.post(`${url}/stripe/create-checkout-session`, payload);
      if (response.data.url) {
        window.location.href = response.data.url;
      } else {
        console.error("Checkout error: No URL received from backend");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      
    }
  };

  return (
    <button className="cart-login" onClick={handleCheckout}>
      Checkout
    </button>
  );
};

export default PayButton;
