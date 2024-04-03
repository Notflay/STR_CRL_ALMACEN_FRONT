import React, { useState, useRef, createContext } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "../node_modules/primeflex/primeflex.css";
import "../node_modules/primeicons/primeicons.css";
import { Toast } from "primereact/toast";
import Login from "./components/content/Login/Login";
import Bienvenida from "./components/content/Inicio/Bienvenida";
import { Componente } from "./components/Componente";
import BodySL from "./components/content/Req.Interno/BodySL";



export const AppContext = createContext(null);

export default function MyApp() {
  const [config, setConfig] = useState({});
  const [usuario, setUsuario] = useState({
    usuario: "",
    pass: "",
  });
  const toast = useRef(null);
  const ruta = "/shopping"; // Servidor"/react-project";

  const showError = () => {


  };

  return (
    <AppContext.Provider
      value={{
        usuario,
        setUsuario,
        showError,
        config: config[0],
        ruta,
      }}
    >
      <Toast ref={toast} />
      <Router>
        <main>
          <Routes>
            <Route path={ruta + "/login"} element={<Login />} />
            <Route
              index
              element={
                <Componente>
                  <Bienvenida />{" "}
                </Componente>
              }
            />
            <Route
              path={ruta + "/"}
              element={
                <Componente>
                  <Bienvenida />{" "}
                </Componente>
              }
            />
            <Route
              path={ruta + "/home"}
              element={
                <Componente>
                  <Bienvenida />{" "}
                </Componente>
              }
            />
            <Route
              path={ruta + "/Inicio"}
              element={

                <Componente>
                  <Bienvenida />{" "}
                </Componente>

              }
            />
            <Route
              path={ruta + "/ReqInterno"}
              element={
                <Componente>
                  <BodySL />
                </Componente>
              }
            />
            {/* <Route
              path={ruta + "/rendiciones"}
              element={
                <Componente>
                  <BodyRD />{" "}
                </Componente>
              }
            /> */}
          </Routes>
        </main>
      </Router>
    </AppContext.Provider>
  );
}
