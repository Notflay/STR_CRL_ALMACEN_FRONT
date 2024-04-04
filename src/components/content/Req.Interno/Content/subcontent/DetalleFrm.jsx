import React, { useState } from "react";
import { Toolbar } from "primereact/toolbar";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";

export function DetalleFrm({
  detalles,
  setDetalles,
  setRequerimiento,
  requerimiento,
}) {
  const [selectedDetalles, setSelectedDetalles] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [productDialog, setProductDialog] = useState(false);

  const footerGroup = (
    <ColumnGroup>
      <Row>
        <Column
          footer="Totales:"
          colSpan={3}
          footerStyle={{ textAlign: "right" }}
        />
        <Column footer={0} />
      </Row>
    </ColumnGroup>
  );

  const selectedOptionTemplate = (option, props) => {
    if (option) {
      return (
        <div className="flex">
          <div>{option.name}</div>
        </div>
      );
    }

    return <span>{props.name}</span>;
  };

  const complementoOptionTemplate = (option) => {
    return (
      <div className="flex">
        <div>{option.name}</div>
      </div>
    );
  };

  const monedas = [
    {
      Descripcion: null,
      Id: 0,
      Nombre: null,
      id: "SOL",
      name: "SOL",
    },
    {
      Descripcion: null,
      Id: 0,
      Nombre: null,
      id: "USD",
      name: "USD",
    },
    { Descripcion: null, Id: 0, Nombre: null, id: "EUR", name: "EUR" },
  ];

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2 align-items-center">
        <Button
          label="Agregar"
          icon="pi pi-plus"
          severity="success"
          // onClick={openNew}
          //disabled={editable}
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
    <>
      <div className="grid">
        <div className="col-12 md:col-6 lg:col-3">
          <div className="mb-3 flex flex-column gap-2">
            <label htmlFor="countries">Moneda</label>
            <div className="card flex">
              <Dropdown
                value={requerimiento.Moneda}
                onChange={
                  (e) => {
                    setRequerimiento((prevRequerimiento) => ({
                      ...prevRequerimiento,
                      Moneda: e.target.value,
                    }));
                  }
                  //   setDocumento((prevDocumento) => ({
                  //     ...prevDocumento,
                  //     STR_MONEDA: e.target.value,
                  //   }))
                }
                options={monedas}
                optionLabel="name"
                placeholder="Selecciona Moneda"
                valueTemplate={selectedOptionTemplate}
                itemTemplate={complementoOptionTemplate}
                className="w-full md:w-14rem"
                //disabled={editable}
                //disabled={!estadosEditables.includes(solicitudRD.estado)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
        <DataTable
          //value={}
          tableStyle={{ minWidth: "50rem" }}
          sortMode="single"
          selection={selectedDetalles}
          onSelectionChange={(e) => setSelectedDetalles(e.value)}
          sortOrder={1}
          footerColumnGroup={footerGroup}
        >
          <Column
            header="N°"
            headerStyle={{ width: "3rem" }}
            body={(data, options) => options.rowIndex + 1}
          ></Column>
          <Column field="STR_CODARTICULO.id" header="Cod. Producto"></Column>
          <Column field="STR_CODARTICULO.name" header="Descripción"></Column>
          <Column
            field="STR_SUBTOTAL"
            header="Almacen"
            // sortable
            //  body={priceBodyTemplate}
          ></Column>
          <Column
            field="STR_INDIC_IMPUESTO.id"
            header="Stock"
            //body={centCostoTemplate}
          ></Column>
          <Column field="STR_PROYECTO.id" header="Cantidad"></Column>
          <Column field="STR_CENTCOSTO.CostCenter" header="Costo"></Column>
          <Column
            field="STR_CODARTICULO.posFinanciera"
            header="SubTotal"
          ></Column>
          <Column field="STR_CUP.U_CUP" header="Fecha Requerida"></Column>
          <Column field="STR_CUP.U_CUP" header="Unidad de Negocio"></Column>
        </DataTable>
      </div>
    </>
  );
}
