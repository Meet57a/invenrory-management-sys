import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import "../css/Home.css";
import OrderContainer from "../Components/home/OrderContainer";
import ProductContainer from "../Components/home/ProductContainer";
import { jwtDecode } from "jwt-decode";
import { ProductQuery } from "../providers/queries/Product.query";
export default function Home() {
  const navigate = useNavigate();
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
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      navigate("/login");
    } else {
      if (token && isTokenExpired(token)) {
        navigate("/login");
      } else {
        navigate("/home");
        alertMessage();
      }
    }
  }, []);

  const alertMessage = async () => {
    const res = await ProductQuery.alertProduct();
      console.log(res);
    // const date = new Date();
    // if (localStorage.getItem("timeOver") === date.getDate().toString()) {
    //   localStorage.setItem("timeOver", date.getDate().toString());

      
    // }
  };
  return (
    <>
      <OrderContainer />
      <ProductContainer />
    </>
  );
}
