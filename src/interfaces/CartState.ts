import Product from "@interfaces/Product";

export default interface CartState{
  cartItems: Product[];
  cartQuantity: number;
  cartTotal: number;
}

