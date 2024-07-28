import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Styled from 'styled-components'; import { logoutUser } from "../../redux/slices/AuthSlice";
import { toast } from "react-toastify";

const shoppingiconmuics = {
  backgroundColor: "primary.main", // Note the correction from 'backgroundColour' to 'backgroundColor'
  color: "rgb(237, 245, 162)",
  fontSize: "2rem"
};

const Navbar = () => {
  function loggedOutToast(): void {
    toast.warning(`You are logged out!`, {
      position: "bottom-left",
    });
  }

  const { cartQuantity } = useSelector((state: any) => state.cart);
  const auth = useSelector((state: any) => state.auth);
  const dispatch: any = useDispatch();

  return (
    <nav className="nav-bar">
      <Link to="/">
        <h2>The Jilbaab Factory</h2>
      </Link>
      <Link to="/cart">
        <div className="navbag">
          <LocalMallOutlinedIcon style={shoppingiconmuics} />
          <span className="bag-quantity">{cartQuantity}</span>
        </div>
      </Link>
      {auth._id ? (
        <Logout
          onClick={() => {
            dispatch(logoutUser());
            loggedOutToast();
          }}
        >
          Logout
        </Logout>
      ) : (
        <Authlinks>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </Authlinks>
      )}
    </nav>
  );
};

export default Navbar;

const Authlinks = Styled.div`
  a {
    &:last-child {
      margin-left: 2rem;
    }
  }
`;

const Logout = Styled.div`
  color: white;
  cursor: pointer;
`;
