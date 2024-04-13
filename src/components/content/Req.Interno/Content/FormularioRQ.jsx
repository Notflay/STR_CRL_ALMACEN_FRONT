import React, { useState, useContext, useEffect } from "react";

import { AppContext } from "../../../../App";
import {
  ObtenerDimensiones,
  ObtenerEstados,
  ObtenerItems,
} from "../../../../services/axios.service";
import { HeaderFrm } from "./subcontent/HeaderFrm";
import { GeneralFrm } from "./subcontent/GeneralFrm";
import { Divider } from "primereact/divider";
import { DetalleFrm } from "./subcontent/DetalleFrm";
import { Button } from "primereact/button";
import { useNavigate, useParams } from "react-router-dom";

export function FormularioRQ(props) {
  const esModoRegistrar = location.pathname.includes("agregar");
  const { id } = useParams();
  const navigate = useNavigate();

  const [estados, setEstados] = useState([]);
  const {
    ruta,
    showError,
    showSuccess,
    setUsuario,
    usuario,
    selectedOptionTemplate,
    complementoOptionTemplate,
  } = useContext(AppContext);

  const [requerimiento, setRequerimiento] = useState({
    Series: null,
    CardCode: null,
    DocDate: new Date(),
    TaxDate: null,
    DocDueDate: new Date(),
    JournalMemo: null,
    Comments: null,
    SalesPersonCode: null,
    DocType: null,
    U_ST_CeCoFilial: null,
    U_ST_NombreFilial: null,
    U_ST_CodArea: null,
    U_ST_UserSolRQ: null,
    Estado: { id: "1", name: "Borrador" }, //{  id: null, name: null },
    Moneda: {
      id: "SOL",
      name: "SOL",
    },
    STR_TOTALDOC: 0.0,
  });

  const [detalles, setDetalles] = useState([]);
  // const [detalles, setDetalles] = useState({
  //   ItemCode: null,
  //   Quantity: null,
  //   Price: null,
  //   WarehouseCode: null,
  //   COGSCostingCode: null,
  //   COGSCostingCode2: null,
  //   COGSCostingCode3: null,
  //   COGSCostingCode4: null,
  //   COGSCostingCode5: null,
  //   Project: null,
  //   U_ST_Comentario: null,
  //   U_ST_NroRQ: null,
  //   U_ST_UserSolRQ: null,
  // });

  function downloadAndOpenPdf() {}

  async function SetDropDowns() {
    //setLoadingTemplate(true);
    //setLoadingTemplate(true);
    try {
      const responses = await Promise.all([
        ObtenerEstados(),
        ObtenerItems("art", usuario.filial.U_ST_Filial),
        ObtenerDimensiones(1), // Unidad de Negocio
        ObtenerDimensiones(2), // Filial
        ObtenerDimensiones(4), // AREA
        ObtenerDimensiones(5), // Centro de Costo
      ]);

      responses.forEach((response, index) => {
        const { CodRespuesta, DescRespuesta, Result } = response.data;

        if (CodRespuesta !== "99") {
          switch (index) {
            case 0:
              setEstados(Result);
              break;
            case 1:
              setItems(Result);
              break;
            case 2:
              setDim1(Result);
              break;
            case 3:
              setDim2(Result);
              break;
            case 4:
              setDim4(Result);
              break;
            case 5:
              setDim5(Result);
              break;
            /*
            case 2:
              setProveedores(Result);
              break;
            case 3:
              setTpoDocs(Result);
              break;
            case 4:
              setProyectos(Result);
              break;
            case 5:
              setIndicadores(Result);
              break;*/
            default:
              break;
          }
        } else {
          console.log(response, index);
          showError(DescRespuesta);
        }
      });
    } catch (error) {
      console.log(error);
      showError("Error en el servidor");
    } finally {
      //if (esModoRegistrar) setLoadingTemplate(false);
      //setLoadingTemplate(false);
    }
  }

  /* useStates a utilizar para el fomulario */
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [dim1, setDim1] = useState([]);
  const [dim2, setDim2] = useState([]);
  const [dim4, setDim4] = useState([]);
  const [dim5, setDim5] = useState([]);

  useEffect(() => {
    // Carga ComboBoxs
    SetDropDowns();
  }, []);

  return (
    <>
      <HeaderFrm
        esModoRegistrar={esModoRegistrar}
        ruta={ruta}
        downloadAndOpenPdf={downloadAndOpenPdf}
      />
      <GeneralFrm
        usuario={usuario}
        requerimiento={requerimiento}
        setRequerimiento={setRequerimiento}
        estados={estados}
        selectedOptionTemplate={selectedOptionTemplate}
        complementoOptionTemplate={complementoOptionTemplate}
      />
      <Divider />
      <DetalleFrm
        detalles={detalles}
        setDetalles={setDetalles}
        usuario={usuario}
        requerimiento={requerimiento}
        setRequerimiento={setRequerimiento}
        estados={estados}
        setLoading={setLoading}
        items={items}
        dim1={dim1}
        dim2={dim2}
        dim4={dim4}
        dim5={dim5}
        selectedOptionTemplate={selectedOptionTemplate}
        complementoOptionTemplate={complementoOptionTemplate}
        showSuccess={showSuccess}
        showError={showError}
      />
      <Divider />
      <div className="card flex flex-wrap  gap-3 mx-3">
        <Button
          label={`${id != null ? "Actualizar" : "Guardar"} Borrador`}
          severity="info"
          size="large"
          style={{ backgroundColor: "black", borderColor: "black" }}
          onClick={(e) => {
            console.log({ ...requerimiento, detalles });
            /*
            setSolicitando(false);
            registrarSR();*/
            // if (esModoRegistrar) {
            //   navigate("/solicitudes");
            // }
          }}
          loading={loading}
          //disabled={!estadosEditables.includes(solicitudRD.estado)}
        />
        <Button
          label="Cancelar"
          severity="secondary"
          size="large"
          onClick={() => navigate(ruta + `/reqInterno`)}
        />
      </div>
    </>
  );
}
