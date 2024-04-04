import React, { useState, useContext, useEffect } from "react";

import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { AppContext } from "../../../../App";
import { InputText } from "primereact/inputtext";
import { ObtenerEstados } from "../../../../services/axios.service";
import { HeaderFrm } from "./subcontent/HeaderFrm";
import { GeneralFrm } from "./subcontent/GeneralFrm";
import { Divider } from "primereact/divider";
import { AnexoFrm } from "./subcontent/AnexoFrm";
import { DetalleFrm } from "./subcontent/DetalleFrm";

export function FormularioRQ(props) {
  const esModoRegistrar = location.pathname.includes("agregar");
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
    DocDate: null,
    TaxDate: null,
    DocDueDate: null,
    JournalMemo: null,
    Comments: null,
    SalesPersonCode: null,
    DocType: null,
    U_ST_CeCoFilial: null,
    U_ST_NombreFilial: null,
    U_ST_CodArea: null,
    U_ST_UserSolRQ: null,
    Estado: { id: "1", name: "Borrador" }, //{  id: null, name: null },
  });

  const [detalles, setDetalles] = useState({
    ItemCode: null,
    Quantity: null,
    Price: null,
    WarehouseCode: null,
    COGSCostingCode: null,
    COGSCostingCode2: null,
    COGSCostingCode3: null,
    COGSCostingCode4: null,
    COGSCostingCode5: null,
    Project: null,
    U_ST_Comentario: null,
    U_ST_NroRQ: null,
    U_ST_UserSolRQ: null,
  });

  function downloadAndOpenPdf() {}

  async function SetDropDowns() {
    //setLoadingTemplate(true);
    //setLoadingTemplate(true);
    try {
      const responses = await Promise.all([ObtenerEstados()]);

      responses.forEach((response, index) => {
        const { CodRespuesta, DescRespuesta, Result } = response.data;

        if (CodRespuesta !== "99") {
          switch (index) {
            case 0:
              setEstados(Result);
              break;
            /*case 1:
              setCentroCosto(Result);
              break;
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
      />
    </>
  );
}
