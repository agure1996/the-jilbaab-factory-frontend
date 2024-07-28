
export default interface Cart<Product>{
    id:number;
    cartItems: Array<Product>[];
    cartQuantity: number;
    cartTotal: number;
}