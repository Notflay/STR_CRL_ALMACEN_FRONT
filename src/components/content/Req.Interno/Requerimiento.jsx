import React, { useRef, useState } from "react";
import { Toast } from "primereact/toast";

import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Dropdown } from "primereact/dropdown";
function Requerimiento({ header, filtrado, requerimiento, setRequerimiento }) {
  const toast = useRef(null);
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <div className="card">
        <Toast ref={toast} />
        <ConfirmDialog />
        <DataTable
          // value={requerimiento}
          sortMode="multiple"
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          tableStyle={{ minWidth: "12rem" }}
          header={header}
          loading={loading}
          emptyMessage="No se encontraron Solicitudes"
        >
          <Column
            header="#"
            headerStyle={{ width: "3rem" }}
            //   body={( options) => options.rowIndex + 1}
          ></Column>
          <Column
            field="N° de Requerimiento"
            header="Código"
            style={{ width: "7rem" }}
            className="font-bold"
          ></Column>
          <Column
            field="STR_NRRENDICION"
            header="Fecha de Registro"
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="STR_ESTADO_INFO"
            header="Fecha Requerido"
            style={{ minWidth: "8rem" }}
            // body={statusBodyTemplate}
          ></Column>
          <Column
            field="STR_EMPLDASIG"
            header="Sucursal"
            style={{ minWidth: "5rem" }}
          ></Column>
          <Column
            field="STR_FECHAREGIS"
            header="Solicitante"
            style={{ minWidth: "10rem" }}
            // body={fecBodyTemplate}
          ></Column>
          <Column
            field="STR_TOTALSOLICITADO"
            // body={priceBodyTemplate}
            header="Encargado Area"
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="STR_DOCENTRY"
            header="Estado"
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            field="STR_CARGADOCS"
            header="SAP DocNum"
            style={{ minWidth: "7rem" }}
          ></Column>
          <Column
            header="Acciones"
            // body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "10rem" }}
            // frozen={true}
            // alignFrozen="right"
          ></Column>
          <Column
            field="STR_MOTIVOMIGR"
            header="Mensaje de Migración"
            style={{ minWidth: "20rem" }}
            // frozen={true}
            // alignFrozen="right"
          ></Column>
        </DataTable>
      </div>
    </div>
  );
}

export default Requerimiento;
