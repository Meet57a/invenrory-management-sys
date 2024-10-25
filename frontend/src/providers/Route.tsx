import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Inventory from "../pages/Inventory";
import CategoryAddForm from "../Components/forms-pages/CategoryAddForm";
import ProductAddForm from "../Components/forms-pages/ProductAddForm";
import SubCategoryAddForm from "../Components/forms-pages/SubCategoryAddForm";
import Orders from "../pages/Orders";

export const Routes = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/home",
    Component: Home,
  },
  {
    path: "/inventory",
    Component: Inventory,
  },
  {
    path: "/add",
    Component: ProductAddForm,
  },
  {
    path: "/productadd",
    Component: ProductAddForm,
  },
  {
    path: "/categoryadd",
    Component: CategoryAddForm,
  },
  {
    path: "/subcategoryadd",
    Component: SubCategoryAddForm,
  },
  {
    path: "/orders",
    Component: Orders,
  },
]);
