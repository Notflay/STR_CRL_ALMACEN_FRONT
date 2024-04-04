import React, { useContext, useEffect, useState, useRef } from "react";
import Header from "./partials/Header";
import Modulos from "./partials/Subpartials/Modulos";
import Layout from "./partials/Subpartials/Layout";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import { Toast } from "primereact/toast";

export function Componente({ children }) {
  const navigate = useNavigate();
  const [setWindowWidth] = useState(window.innerWidth);
  const toast = useRef(null);
  const { /* usuario, showError, */ ruta, usuario } = useContext(AppContext);
  // const { usuario, showError, ruta } = useContext(AppContext);
  const [SideBarActive, setSideBarActive] = useState(true);
  // const navigate = useNavigate();

  /*
  const showSuccess = (detalle) => {
    toast.current.show({
      severity: "success",
      summary: "Exitoso",
      detail: detalle,
      life: 3000,
    });
  };

  const showError = (detalle) => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: detalle,
      life: 3000,
    });
  };
  */
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
    //setSideBarActive(window.innerWidth >= 992);
  };

  const responsiveSize = () => {
    return window.innerWidth < 992;
  };

  const responsiveSizeMobile = () => {
    return window.innerWidth < 400;
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if ((usuario == null) | (usuario?.usuarioId == null)) {
      navigate(ruta + "/login", { replace: true });
    } else {
      console.log(usuario);
    }
  }, []);

  return (
    <>
      <Toast ref={toast} />
      <Header
        setSideBarActive={setSideBarActive}
        SideBarActive={SideBarActive}
        responsiveSize={responsiveSize()}
        responsiveSizeMobile={responsiveSizeMobile()}
        usuario={usuario}
      />
      <Modulos
        responsiveSize={responsiveSize()}
        SideBarActive={SideBarActive}
        setSideBarActive={setSideBarActive}
        responsiveSizeMobile={responsiveSizeMobile()}
      />
      <Layout
        SideBarActive={SideBarActive}
        responsiveSizeMobile={responsiveSizeMobile()}
      >
        {children}
      </Layout>
    </>
  );
}
