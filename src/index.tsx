import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; //Importar a estilização dos toasts;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    {" "}
    {/* Para funcionar o reactTS */}
    <BrowserRouter>
      {" "}
      {/* Funcionar as rotas /login... */}
      <AuthProvider>
        {" "}
        {/* Para funcionar as Rotas da API */}
        <App /> {/* Toda a aplicação */}
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />{" "}
        {/* Toasts de avisos */}
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
