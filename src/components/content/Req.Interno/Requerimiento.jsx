import React, { useRef, useState } from 'react'
import { Toast } from 'primereact/toast'

import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
function Requerimiento({
    header,
    filtrado,
    requerimiento,
    setRequerimiento,
}) {
    const toast = useRef(null);
    const [loading, setLoading] = useState(false);
  return (
    <div><div>
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
            field="ID"
            header="Código"
            style={{ width: "7rem" }}
            className="font-bold"
        ></Column>
        <Column
            field="STR_NRRENDICION"
            header="N° Rendición"
            style={{ minWidth: "12rem" }}
        ></Column>
        <Column
            field="STR_ESTADO_INFO"
            header="Estado"
            style={{ minWidth: "8rem" }}
            // body={statusBodyTemplate}
        ></Column>
        <Column
            field="STR_EMPLDASIG"
            header="Emp. Asignado"
            style={{ minWidth: "5rem" }}
        ></Column>
        <Column
            field="STR_FECHAREGIS"
            header="Fecha de Solicitud"
            style={{ minWidth: "10rem" }}
            // body={fecBodyTemplate}
        ></Column>
        <Column
            field="STR_TOTALSOLICITADO"
            // body={priceBodyTemplate}
            header="Monto Solicitado"
            style={{ minWidth: "12rem" }}
        ></Column>
        <Column
            field="STR_DOCENTRY"
            header="DocEntry"
            style={{ minWidth: "10rem" }}
        ></Column>
        <Column
            field="STR_CARGADOCS"
            header="Carga Docs"
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
  )
}

export default Requerimiento
