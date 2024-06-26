import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../App";

function SideBar({ responsiveSize, setSideBarActive, SideBarActive }) {
  const [modulos, setModulos] = useState({
    inicio: true,
    requerimiento: false,
  });
  const { ruta } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <>
      <ul className="p-0">
        <li className="list-none">
          <div className="font-bold">INICIO</div>
          <ul className="p-0">
            <li className="list-none">
              <a
                className={`flex align-items-center relative outline-none cursor-pointer gap-2 pt-3 w-full hover:text-primary-600 ${
                  modulos.inicio ? "text-primary-600" : ""
                } no-underline`}
                style={{
                  padding: ".75rem 1rem",
                  borderRadius: "10px",
                  transition: "background-color .2s,box-shadow .2s",
                }}
                //href="/home"
                onClick={() => {
                  setModulos({
                    inicio: true,
                    requerimiento: false,
                  });
                  navigate(ruta + "/home");
                  if (responsiveSize) {
                    setSideBarActive(!SideBarActive);
                  }
                }}
              >
                <i className="pi pi-home"></i>
                <span className="">Bienvenida</span>
              </a>
            </li>
          </ul>
        </li>
        <li className="list-none pt-3">
          <div className="font-bold">MODULOS</div>
          <ul className="p-0">
            <li className="list-none">
              <a
                className={`flex align-items-center relative outline-none hover:text-primary-600 cursor-pointer gap-2 pt-3 w-full ${
                  modulos.ReqInterno ? "text-primary-600" : ""
                }`}
                style={{
                  padding: ".75rem 1rem",
                  borderRadius: "10px",
                  transition: "background-color .2s,box-shadow .2s",
                }}
                onClick={() => {
                  setModulos({
                    inicio: false,
                    requerimiento: true,
                  });
                  navigate(ruta + "/reqInterno");
                  if (responsiveSize) {
                    setSideBarActive(!SideBarActive);
                  }
                }}
              >
                <i className="pi pi-pencil"></i>
                <span>Requerimiento</span>
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </>
  );
}

export default SideBar;
