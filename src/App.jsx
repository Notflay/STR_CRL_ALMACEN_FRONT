import React, { useState, useRef, createContext } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "../node_modules/primeflex/primeflex.css";
import "../node_modules/primeicons/primeicons.css";
import { Toast } from "primereact/toast";
import Login from "./components/content/Login/Login";
import Bienvenida from "./components/content/Inicio/Bienvenida";
import { Componente } from "./components/Componente";
import BodySL from "./components/content/Req.Interno/BodySL";
import { FormularioRQ } from "./components/content/Req.Interno/Content/FormularioRQ";

export const AppContext = createContext(null);

export default function MyApp() {
  const [config, setConfig] = useState({});
  const [usuario, setUsuario] = useState({
    usuarioId: null,
    nombres: "",
    apellidos: "",
    email: "",
    username: "",
    password: "",
    rol: null,
    filial: null,
  });
  const toast = useRef(null);
  const ruta = "/warehouse"; // Servidor"/react-project";

  const showError = (detalle) => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: detalle,
      life: 3000,
    });
  };

  const showSuccess = (detalle) => {
    toast.current.show({
      severity: "success",
      summary: "Exitoso",
      detail: detalle,
      life: 3000,
    });
  };

  /* 
  Por defecto 
  */

  const selectedOptionTemplate = (option, props) => {
    if (option) {
      return (
        <div className="flex">
          <div>{option.name}</div>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };

  const complementoOptionTemplate = (option) => {
    return (
      <div className="flex">
        <div>{option.id}</div>
      </div>
    );
  };

  return (
    <AppContext.Provider
      value={{
        usuario,
        setUsuario,
        showError,
        showSuccess,
        config: config[0],
        ruta,
        selectedOptionTemplate,
        complementoOptionTemplate,
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
            <Route
              path={ruta + "/ReqInterno/agregar"}
              element={
                <Componente>
                  <FormularioRQ />
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
