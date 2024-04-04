import React from "react";
import { Toolbar } from "primereact/toolbar";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { DataTable } from "primereact/datatable";
import { Row } from "primereact/row";

export function DetalleFrm({ detalles, setDetalles }) {
  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2 align-items-center">
        <Button
          label="Agregar"
          icon="pi pi-plus"
          severity="success"
          onClick={openNew}
          disabled={editable}
          // disabled={
          //   solicitudRD.ordenDeViaje |
          //   (solicitudRD.tipoear == null) |
          //   !estadosEditables.includes(solicitudRD.estado)
          // }
        />
        <label style={{ color: "red" }}>
          {/* {solicitudRD.ordenDeViaje == true
                ? "No se permite subir Articulos con orden de viaje"
                : false} */}
        </label>
      </div>
    );
  };

  return (
    <div className="card">
      <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
    </div>
  );
}
