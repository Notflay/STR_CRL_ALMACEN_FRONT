import React, { useState, useMemo } from "react";
import { Toolbar } from "primereact/toolbar";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { FormDetalle } from "./FormDetalle";

export function DetalleFrm({
  detalles,
  setDetalles,
  setRequerimiento,
  requerimiento,
  usuario,
  setLoading,
  items,
  dim1,
  dim2,
  dim4,
  dim5,
  selectedOptionTemplate,
  complementoOptionTemplate,
  showSuccess,
  showError,
}) {
  const [selectedDetalles, setSelectedDetalles] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);

  // Crear ALMACEN
  let emptyProduct = {
    STR_ITEM: {
      ItemCode: null,
      ItemName: null,
      U_BPP_TIPUNMED: null,
      WhsCode: null,
    },
    //STR_ALMACEN: null, // Obtiene automatico de la Filial
    STR_STOCK: 0,
    STR_CANTIDAD: 0,
    STR_COSTO: 0,
    STR_SUBTOTAL: 0,
    STR_FECHAREQ: new Date(),
    STR_DIM1: { id: null, name: null },
    STR_DIM2: { id: null, name: null },
    STR_DIM3: { id: null, name: null },
    STR_DIM4: { id: null, name: null },
    STR_DIM5: { id: null, name: null },
    STR_COMENTARIO: null,
  };
  //

  const fecBodyTemplate = (rowData) => {
    // const memoizedFecha = useMemo(() => {
    //   const parts = rowData.STR_FECHAREQ.split(" ");
    //   const dateParts = parts[0].split("/");
    //   const timeParts = parts[1].split(":");
    //   return new Date(
    //     parseInt(dateParts[2], 10),
    //     parseInt(dateParts[1], 10) - 1,
    //     parseInt(dateParts[0], 10),
    //     parseInt(timeParts[0], 10),
    //     parseInt(timeParts[1], 10),
    //     parseInt(timeParts[2], 10)
    //   );
    // }, [rowData.STR_FECHAREQ]);

    return <>{rowData.STR_FECHAREQ.toISOString().split("T")[0]}</>;
  };

  const [detalle, setDetalle] = useState(emptyProduct);

  const editDetalle = (detalle) => {
    setDetalle(detalle);
    setProductDialog(true);
  };

  const confirmDeleteDetalle = (detalle) => {
    setDetalle(detalle);
    setDeleteProductDialog(true);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          onClick={() => editDetalle(rowData)}
          // disabled={
          //   (usuario.TipoUsuario != 1) |
          //   !estadosEditables.includes(solicitudRD.estado)
          // }
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteDetalle(rowData)}
          // disabled={
          //   (usuario.TipoUsuario != 1) |
          //   !estadosEditables.includes(solicitudRD.estado)
          // }
        />
      </React.Fragment>
    );
  };

  //
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

  const monedas = [
    {
      id: "SOL",
      name: "SOL",
    },
    {
      id: "USD",
      name: "USD",
    },
    { id: "EUR", name: "EUR" },
  ];

  const openNew = () => {
    setDetalle(emptyProduct);
    //obtenerCentroCostoLocal();
    setSubmitted(false);
    setProductDialog(true);
  };

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2 align-items-center">
        <Button
          label="Agregar"
          icon="pi pi-plus"
          severity="success"
          onClick={openNew}
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
                valueTemplate={(e) => selectedOptionTemplate(e, false)}
                itemTemplate={(e) => complementoOptionTemplate(e, false)}
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
          value={detalles}
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
          <Column field="STR_ITEM.ItemCode" header="Cod. Producto"></Column>
          <Column field="STR_ITEM.ItemName" header="Descripción"></Column>
          <Column
            field="STR_ITEM.WhsCode"
            header="Almacen"
            // sortable
            //  body={priceBodyTemplate}
          ></Column>
          <Column
            field="STR_ITEM.Stock"
            header="Stock"
            //body={centCostoTemplate}
          ></Column>
          <Column field="STR_ITEM.Precio" header="Costo"></Column>
          <Column field="STR_CANTIDAD" header="Cantidad"></Column>
          <Column field="STR_SUBTOTAL" header="SubTotal"></Column>
          <Column
            field="STR_FECHAREQ"
            body={fecBodyTemplate}
            header="Fecha Requerida"
          ></Column>
          <Column field="STR_DIM1.name" header="Unidad de Negocio"></Column>
          <Column field="STR_DIM2.name" header="Filial"></Column>
          <Column field="STR_DIM4.name" header="Área"></Column>
          <Column field="STR_DIM5.name" header="Centro de Costo"></Column>
          <Column field="STR_COMENTARIO" header="Comentario"></Column>
          <Column
            header="Acciones"
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "12rem" }}
          ></Column>{" "}
        </DataTable>
      </div>
      <FormDetalle
        moneda={requerimiento.Moneda.name}
        setRequerimiento={setRequerimiento}
        setProductDialog={setProductDialog}
        setSubmitted={setSubmitted}
        emptyProduct={emptyProduct}
        detalles={detalles}
        setDetalles={setDetalles}
        detalle={detalle}
        setDetalle={setDetalle}
        setDeleteProductDialog={setDeleteProductDialog}
        setLoading={setLoading}
        productDialog={productDialog}
        items={items}
        dim1={dim1}
        dim2={dim2}
        dim4={dim4}
        dim5={dim5}
        selectedOptionTemplate={selectedOptionTemplate}
        complementoOptionTemplate={complementoOptionTemplate}
        showSuccess={showSuccess}
        showError={showError}
        usuario={usuario}
      />
    </>
  );
}
