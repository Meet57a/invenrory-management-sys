import { useState } from "react";
import "../css/login_css.css";
import { AuthQuery } from "../providers/queries/Auth.query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  type User = {
    email: string;
    password: string;
  };

  const initialValue: User = {
    email: "",
    password: "",
  };
  const isTokenExpired = (token: string) => {
    if (!token) return true;
    try {
      const decodedToken: { exp?: number } = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return (decodedToken.exp ?? 0) < currentTime;
    } catch (error) {
      console.error("Error decoding token:", error);
      return true;
    }
  };

  const [user, setUser] = useState<User>(initialValue);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      navigate("/login");
    } else {
      if (token && isTokenExpired(token)) {
        navigate("/login");
      } else {
        navigate("/home");
      }
    }
  }, []);

  const validateForm = () => {
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
      const res = await AuthQuery.login(user);
      if (res) {
        console.log(res);
        localStorage.setItem("token", res.token);
        toast.success("Login successfully", {
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

  const resetForm = () => {
    setUser(initialValue);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
