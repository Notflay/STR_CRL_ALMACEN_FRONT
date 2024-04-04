import { Button } from "primereact/button";
import React, { useContext, useState } from "react";
import { AppContext } from "../../../App";
import { Divider } from "primereact/divider";
import { useNavigate } from "react-router-dom";
import HeaderSL from "./HeaderSL";
import Requerimiento from "./Requerimiento";

function BodySL({ responsiveSizeMobile }) {
  const [estados, setEstados] = useState([]);
  const [requerimiento, setRequerimiento] = useState([]);
  const { usuario, ruta } = useContext(AppContext);

  const navigate = useNavigate();
  const esRequirimiento = location.pathname.includes("reqInterno");
  const now = new Date();
  // const [filtrado, setFiltrado] = useState({
  //     rangoFecha: [new Date(now.getFullYear(), 0, 1), new Date()],
  //     nrRendicion: null,
  //     estados:
  //       /*usuario.TipoUsuario == 2 ? [estados[1]] :*/ usuario.TipoUsuario == 1
  //         ? [
  //             {
  //               Id: 1,
  //               Nombre: "Borrador",
  //               Descripcion: null,
  //               id: null,
  //               name: null,
  //             },
  //             {
  //               Id: 5,
  //               Nombre: "Rechazado SR",
  //               Descripcion: null,
  //               id: null,
  //               name: null,
  //             },
  //             {
  //               Id: 7,
  //               Nombre: "Error Mig SR",
  //               Descripcion: null,
  //               id: null,
  //               name: null,
  //             },
  //           ]
  //         : usuario.TipoUsuario == 2
  //         ? [
  //             {
  //               Id: 2,
  //               Nombre: "Pendiente",
  //               Descripcion: null,
  //               id: null,
  //               name: null,
  //             },
  //             {
  //               Id: 3,
  //               Nombre: "En Autorización SR",
  //               Descripcion: null,
  //               id: null,
  //               name: null,
  //             },
  //           ]
  //         : usuario.TipoUsuario == 4
  //         ? [
  //             {
  //               Id: 7,
  //               Nombre: "Error Mig SR",
  //               Descripcion: null,
  //               id: null,
  //               name: null,
  //             },
  //           ]
  //         : null,
  //     empleadoAsig: null,
  //   });
  const header = (
    <>
      <div className="flex justify-content-between flex-wrap">
        <div
          className={`flex ${
            responsiveSizeMobile ? `text-xl` : `text-2xl`
          } align-items-center`}
        >
          Lista de Requerimientos
        </div>
        <div div className="flex flex-row flex-wrap gap-2">
          <Button
            icon="pi pi-refresh"
            //       onClick={() => {
            //        setFiltrado((prevFiltrado) => ({
            //           ...prevFiltrado,
            //  }));
            //   }}
            severity="secondary"
          />
          <Button
            icon="pi pi-eraser"
            // onClick={() => {
            //      setFiltrado({
            //         rangoFecha: [new Date(now.getFullYear(), 0, 1), new Date()],
            //         nrRendicion: null,
            //        estados: null,
            // });
            // }}
            severity="secondary"
          />
          <Button
            label="Agregar"
            icon="pi pi-plus"
            severity="success"
            onClick={() => {
              navigate(ruta + "/reqInterno/agregar");
            }}
            disabled={usuario.rol?.id != 1}
          />
          <Button
            label="Exportar"
            icon="pi pi-upload"
            severity="secondary"
            style={{ backgroundColor: "black" }}
            // onClick={() => {
            //     exportExcel();
            // }}
          />
        </div>
      </div>
      <Divider />
      {/* <Filtrado
                estados={estados}
                setEstados={setEstados}
                // filtrado={filtrado}
                setFiltrado={setFiltrado}
            /> */}
    </>
  );
  return (
    <>
      <div className="card">
        <HeaderSL
          estados={estados}
          setEstados={setEstados}
          // filtrado={filtrado}
          // setFiltrado={setFiltrado}
          header={header}
        />
        <Requerimiento
          responsiveSizeMobile={responsiveSizeMobile}
          header={header}
          estados={estados}
          setEstados={setEstados}
          // filtrado={filtrado}
          // setFiltrado={setFiltrado}
          requerimiento={Requerimiento}
          setRequerimiento={setRequerimiento}
        />
      </div>
    </>
  );
}

export default BodySL;
