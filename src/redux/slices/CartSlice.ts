import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import Product from "../../interfaces/Product";

const local: string | null = localStorage.getItem("cartItems");
const initialState: any = {
  cartItems: local ? JSON.parse(local) : [],
  cartQuantity: 0,
  cartTotal: 0,
};

export const toasts = {
  successfullyAddedToCartToast: (payload: any) => {
    toast.success(`${payload} added to cart`, {
      position: "bottom-left",
    });
  },
  addedSameItemAgainToCartToast: (itemName: any) => {
    toast.info(`Increased quantity of ${itemName} in your cart`, {
      position: "bottom-left",
    });
  },
  itemRemovedFromCartToast: (action: any) => {
    toast.error(`${action} removed from cart`, {
      position: "bottom-left",
    });
  },
  cartEmpty: () => {
    toast.error(`Emptied cart`, {
      position: "bottom-left",
    });
  },
  decreasedQuantity: (action: any) => {
    toast.info(`Decreased ${action} Quantity`, {
      position: "bottom-left",
    });
  },
};

const removeItem = (state: any, action: PayloadAction<Product>) => {
  const nextCartItems = (state.cartItems = state.cartItems.filter(
    (cartItem: any) => cartItem.id !== action.payload.id
  ));
  toasts.itemRemovedFromCartToast(action.payload.name);
  state.cartItems = nextCartItems;
  localStorage.setItem("cartItems", JSON.stringify(nextCartItems));
};

const CartSlice: any = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state: any, action: PayloadAction<Product>) {
      const itemIndex = state.cartItems.findIndex(
        (item: any) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartTotalQuantity += 1;

        const itemName = state.cartItems[itemIndex].name || "item";
        toasts.addedSameItemAgainToCartToast(itemName);
      } else {
        const tempProduct = { ...action.payload, cartTotalQuantity: 1 };
        state.cartItems.push(tempProduct);

        toasts.successfullyAddedToCartToast(action.payload.name);
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeItemFromCart(state: any, action: PayloadAction<Product>) {
      removeItem(state, action);
    },
    clearCart(state: any) {
      const emptyCart = (state.cartItems = []);
      toasts.cartEmpty();
      localStorage.setItem("cartItems", JSON.stringify(emptyCart));
    },
    decreaseItemQuantity(state: any, action: PayloadAction<Product>) {
      const itemIndex = state.cartItems.findIndex(
        (item: any) => item.id === action.payload.id
      );
      const itemQuantity = state.cartItems[itemIndex].cartTotalQuantity;
      if (itemQuantity > 1) {
        state.cartItems[itemIndex].cartTotalQuantity -= 1;
        toasts.decreasedQuantity(action.payload.name);
      } else if (itemQuantity === 1) {
        removeItem(state, action);
      }
    },
    getTotals(state: any) {
      const { cartTotal, cartQuantity } = state.cartItems.reduce(
        (cartTotal: any, cartItem: any) => {
          const { price, cartTotalQuantity } = cartItem;
          const itemTotal = price * cartTotalQuantity;

          cartTotal.cartTotal += itemTotal;
          cartTotal.cartQuantity += cartTotalQuantity;

          return cartTotal;
        },
        {
          cartTotal: 0,
          cartQuantity: 0,
        }
      );

      state.cartTotal = cartTotal;
      state.cartQuantity = cartQuantity;
    },
  },
});

export const {
  addToCart,
  removeItemFromCart,
  decreaseItemQuantity,
  clearCart,
  getTotals,
} = CartSlice.actions;

export default CartSlice.reducer;
