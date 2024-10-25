import { useEffect, useState } from "react";
import "../css/register.css";
import { AuthQuery } from "../providers/queries/Auth.query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  type User = {
    name: string;
    email: string;
    password: string;
  };

  const initialValue: User = {
    name: "",
    email: "",
    password: "",
  };

  const [user, setUser] = useState<User>(initialValue);
  const navigate = useNavigate();

  const validateForm = () => {
    if (user.name === "") {
      alert("Name is required");
      return false;
    }
    if (user.email === "") {
      alert("Email is required");
      return false;
    }
    if (user.password === "") {
      alert("Password is required");
      return false;
    }
    if (user.password.length < 6) {
      alert("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      const res = await AuthQuery.register(user);
      if (res) {
        console.log(res);
        localStorage.setItem("token", res.token);
        toast.success("Register successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          closeButton: false,
        });
        resetForm();
        navigate("/home");
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  }, []);

  const resetForm = () => {
    setUser(initialValue);
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}
