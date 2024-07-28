import { useDispatch, useSelector } from "react-redux";
import  {useNavigate}  from 'react-router';
import Product from "../interfaces/Product";
import { useGetAllProductsQuery } from "../redux/api/productsApi";
import { addToCart } from "../redux/slices/CartSlice";

const Home = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();
  /**
   * Rationale for instantiating Auth below the way it is instead of:
   * 
   * const state = useSelector((state: any) => state);
   * const auth = state.auth;
   * console.log(auth);
   * 
   * DOM warning: Selector unknown returned the root state when called.
   * This can lead to unnecessary rerenders. 
   * Selectors that return the entire state are almost certainly a mistake
   * as they will cause a rerender whenever *anything* in state changes. 
   */

  /* 
    for when following auth in console
   const auth = useSelector((state:any) => state.auth);
   console.log(auth);
  */
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = (product: Product): void => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  let content;

  if (isLoading) {
    content = <p>Loading..</p>;
  } else if (error) {
    content = <p>An error Occured</p>;
  } else {
    content = (
      <div className="products">
        {data?.map((product: Product) => {
          return (
            <div className="product" key={product.id}>
              <h3>{product.name}</h3>
              <img src={product.img} alt={product.name} />
              <div className="details">
                <span>{product.description}</span>
                <span className="price">£{product.price}</span>
              </div>
              <button onClick={() => handleAddToCart(product)}>
                Add To Cart
              </button>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="home-container">
      <h1>New Products</h1>
      <br />
      {content}
    </div>
  );
};

export default Home;
