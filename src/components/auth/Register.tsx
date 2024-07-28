import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/slices/AuthSlice";
import { StyledForm } from "./StyledForm";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Register = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state:any) => state.auth);

  useEffect(() => {
    if (auth._id) {
      registeredToast()
      navigate("/");
    }
  }, [auth._id, user.name, navigate]);
  

  function registeredToast() {
    toast.success(`Welcome ${user.name}!`, {
      position: "bottom-left",
    });
  }

  function handleSubmit(e:any) {
    e.preventDefault();
    dispatch(registerUser(user));
  }

  return (
    <div>
      <StyledForm onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Name"
          value={user.name}
          onChange={(e:any) => setUser({ ...user, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e:any) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e:any) => setUser({ ...user, password: e.target.value })}
        />
        <button disabled={auth.registerStatus === "Pending.."}>{auth.registerStatus === "Pending.." ? "Submitting" : "Register"}</button>
        {auth.registerStatus === "Rejected" ? <p>{auth.registerError}</p> : null}
      </StyledForm>
    </div>
  );
};

export default Register;
