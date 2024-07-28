import { Link } from "react-router-dom";
import {  useEffect } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/slices/CartSlice";


const CheckoutSuccess = () => {
  const dispatch = useDispatch();

  const backArrowiconmuics = {
    width: "20px",
    Padding: "1rem 1rem",
    backgroundColour: "primary.main",
    color: "grey",
  };

  useEffect(() => {
    dispatch(clearCart());
  }, []);
  return (
    <div className="checkout-success-container">
      <h2>Checked Out Successfully!</h2>

      <div className="continue-shopping">
        <Link to="/">
          <AddShoppingCartIcon
            sx={backArrowiconmuics}
            className="continueShoppingLink"
          />
          <span>Continue Shopping</span>
        </Link>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
