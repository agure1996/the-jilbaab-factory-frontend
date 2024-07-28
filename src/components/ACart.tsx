import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import PayButton from "./auth/PayButton"; 

import {
  removeItemFromCart,
  decreaseItemQuantity,
  addToCart,
  clearCart,
  getTotals,
} from "../redux/slices/CartSlice";

const ACart: React.FC = () => {
  const backArrowiconmuics = {
    width: "20px",
    Padding: "1rem 1rem",
    backgroundColour: "primary.main",
    color: "grey",
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRemoveFromCartItem = (cartItem: any) => {
    dispatch(removeItemFromCart(cartItem));
  };

  const handleDecreaseQuantity = (cartItem: any) => {
    dispatch(decreaseItemQuantity(cartItem));
  };

  const handleIncreaseQuantity = (cartItem: any) => {
    dispatch(addToCart(cartItem));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const cartState = useSelector((state: any) => state.cart);
  const auth = useSelector((state: any) => state.auth);

  useEffect(() => {
    dispatch(getTotals());
  }, [cartState.cartItems, dispatch]);

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cartState.cartItems.length == 0 ? (
        <div className="cart-empty">
          <p>Your Cart is currently empty</p>
          <div className="start-shopping">
            <Link to="/" className="continueShoppingLink">
              <ArrowBackIcon sx={backArrowiconmuics} />
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="titles">
            <h3 className="product-title">Product</h3>
            <h3 className="price">Price</h3>
            <h3 className="quantity">Quantity</h3>
            <h3 className="total">Total</h3>
          </div>
          <div className="cart-items">
            {cartState.cartItems.map((item: any) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-product">
                  <img src={item?.img} alt={item?.name} />
                  <div className="">
                    <h3>{item?.name}</h3>
                    <p>{item?.description}</p>
                    <button onClick={() => handleRemoveFromCartItem(item)}>
                      Remove
                    </button>
                  </div>
                </div>
                <div className="cart-product-price">£{item?.price}</div>
                <div className="cart-product-quantity">
                  <button
                    onClick={() => {
                      handleDecreaseQuantity(item);
                    }}
                  >
                    -
                  </button>
                  <div className="count">{item?.cartTotalQuantity}</div>
                  <button
                    onClick={() => {
                      handleIncreaseQuantity(item);
                    }}
                  >
                    +
                  </button>
                </div>
                <div className="cart-product-total-price">
                  £{item?.price * item?.cartTotalQuantity}
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <button
              className="clear-cart"
              onClick={() => {
                handleClearCart();
              }}
            >
              Clear Basket
            </button>
            <div className="cart-checkout">
              <div className="subtotal">
                <span className="subtotal-heading">Subtotal</span>
                <span className="amount">£{cartState?.cartTotal}</span>
              </div>
              <p>Taxes and Shipping are calculated at Checkout</p>
              {auth._id ? (
                <PayButton items={cartState.cartItems} />
              ) : (
                <button
                  className="cart-login"
                  onClick={() => navigate("/login")}
                >
                  Log in to checkout
                </button>
              )}

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
          </div>
        </>
      )}
    </div>
  );
};

export default ACart;
