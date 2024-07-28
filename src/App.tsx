import "./App.css";
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home";
import Cart from "./components/ACart";
import NotFound from "./components/NotFound";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { ToastContainer } from "react-toastify";
import CheckoutSuccess from "./components/auth/CheckoutSuccess";


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <ToastContainer />
        <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout-success" element={<CheckoutSuccess />} />
        <Route path="/login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
