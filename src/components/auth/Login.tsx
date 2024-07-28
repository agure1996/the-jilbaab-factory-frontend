import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { StyledForm } from "./StyledForm"
import { loginUser } from "../../redux/slices/AuthSlice";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (auth._id) {
      toast.success(`Welcome back!`, {
        position: "bottom-left",
      });
      navigate("/");
    }
  }, [auth._id, navigate]);

  function handleSubmit(e: any): void {
    e.preventDefault();
    dispatch(loginUser(user));
  }

  return (
    <div>
      <StyledForm>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="email"
          onChange={(e: any) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e: any) => setUser({ ...user, password: e.target.value })}
        />
        <button onClick={handleSubmit}>{auth.loginStatus === "Pending.." ? "Submitting" : "Login"}</button>
        {auth.loginStatus === "Rejected" ? <p>{auth.loginStatus}</p> : null}
      </StyledForm>
    </div>
  );
}

export default Login;
