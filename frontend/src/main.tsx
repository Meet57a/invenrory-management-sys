import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { Routes } from "./providers/Route.tsx";
import { Provider } from "react-redux";
import { store } from "./providers/Store.tsx";
import { PrimeReactProvider } from "primereact/api";
import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { Layout } from "./Components/Layout.tsx";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { createTheme } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <ThemeProvider
        theme={createTheme({
          palette: {
            mode: "dark",
          },
        })}
      >
        <Provider store={store}>
          <Layout>
            <RouterProvider router={Routes} />
          </Layout>
          <ToastContainer />
        </Provider>
      </ThemeProvider>
    </PrimeReactProvider>
  </React.StrictMode>
);
