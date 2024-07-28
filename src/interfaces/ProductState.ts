import Product from "@interfaces/Product";

export default interface ProductState {
  items: Product[];
  status: boolean | null | string;
  error: null | string;
}
