import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";

export function FormDetalle({
  usuario,
  items,
  productDialog,
  setRequerimiento,
  setProductDialog,
  setDetalle,
  setDetalles,
  setSubmitted,
  emptyProduct,
  detalles,
  detalle,
  setDeleteProductDialog,
  setLoading,
  deleteProductDialog,
  moneda,
  dim1,
  dim2,
  dim4,
  dim5,
  selectedOptionTemplate,
  complementoOptionTemplate,
  showSuccess,
  showError,
}) {
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
    setDetalle(emptyProduct);
  };

  const saveProduct = () => {
    setSubmitted(true);

    let _detalles = [...detalles];
    let _detalle = { ...detalle };
    console.log(_detalle);
    if (
      detalle.STR_ITEM.ItemCode != null
      //detalle.cantidad > 0
    ) {
      if (detalle.ID) {
        const index = _detalles.findIndex((p) => p.ID === detalle.ID);

        if (index !== -1) {
          _detalles[index] = _detalle;

          showSuccess("Concepto Actualizado");
        }
      } else {
        _detalle.ID = createId();
        _detalles.push({
          ..._detalle,
        });

        showSuccess("Concepto Agregado");
      }

      let STR_TOTALDOC = _detalles.reduce(
        (acumulador, detalle) => acumulador + (detalle.STR_SUBTOTAL || 0),
        0
      );

      setRequerimiento((prevRequerimiento) => ({
        ...prevRequerimiento,
        STR_TOTALDOC: STR_TOTALDOC,
      }));

      setDetalles(_detalles);
      setProductDialog(false);
      setDetalle(emptyProduct);
    }
  };

  const createId = () => {
    let id = "";
    let chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return id;
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  const deleteProduct = async () => {
    setLoading(true);

    let _detalles = detalles.filter((val) => val.ID !== detalle.ID);
    setDetalles(_detalles);
    setDeleteProductDialog(false);

    if (typeof detalle.ID == "number") {
      // await borrarDocumentoDet(detalle.ID, documentoId).catch((err) => {
      //   console.log(err.message);
      //   showError("No se pudo eliminar detalle");
      // });
    }

    let STR_TOTALDOC = _detalles.reduce(
      (acumulador, detalle) => acumulador + (detalle.STR_SUBTOTAL || 0),
      0
    );
    setRequerimiento((prevRequerimiento) => ({
      ...prevRequerimiento,
      STR_TOTALDOC: STR_TOTALDOC,
    }));

    showSuccess("Concepto Eliminiado");
    setLoading(false);
  };

  const productDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        outlined
        onClick={hideDialog}
        //disabled={!estadosEditables.includes(estado)}
      />
      <Button
        label="Guardar"
        icon="pi pi-check"
        onClick={saveProduct}
        //disabled={editable}
        //disabled={!estadosEditables.includes(estado)}
      />
    </React.Fragment>
  );
  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteProductDialog}
        // disabled={!estadosEditables.includes(estado)}
      />
      <Button
        label="Si"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteProduct}
        //disabled={!estadosEditables.includes(estado)}
      />
    </React.Fragment>
  );

  const deleteProductsDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteProductsDialog}
        //disabled={!estadosEditables.includes(estado)}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        // onClick={deleteSelectedProducts}
        // disabled={!estadosEditables.includes(estado)}
      />
    </React.Fragment>
  );

  const selectedOptionTemplateItem = (option, props) => {
    if (option) {
      return (
        <div className="flex">
          <div>
            {option.ItemName}
            {/* {option.ItemCode} - {option.ItemName} - {option.U_BPP_TIPUNMED} */}
          </div>
        </div>
      );
    }
    return <span>{props.placeholder}</span>;
  };

  const complementoOptionTemplateItem = (option) => {
    return (
      <div className="flex">
        <div>
          {option.ItemCode} - {option.ItemName}
        </div>
      </div>
    );
  };

  return (
    <>
      <Dialog
        visible={productDialog}
        //style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Agregar Concepto"
        modal
        className="p-fluid xl:max-w-30rem w-full max-w-20rem"
        footer={productDialogFooter}
        onHide={hideDialog}
      >
        <div className="flex gap-2">
          <div className="field">
            <label htmlFor="name" className="font-bold">
              Árticulo
            </label>
            <div className="card flex">
              <Dropdown
                value={detalle.STR_ITEM}
                onChange={(e) => {
                  setDetalle((prevDetalle) => ({
                    ...prevDetalle,
                    STR_ITEM: e.target.value,
                  }));
                  //validaIgualdadEnDetalle(e.target.value);
                }}
                options={items}
                optionLabel="ItemName"
                placeholder="Articulo"
                filter
                filterBy="ItemCode,ItemName"
                valueTemplate={selectedOptionTemplateItem}
                itemTemplate={complementoOptionTemplateItem}
                className="w-full md:w-14rem"
                //disabled={editable}
                //disabled={!estadosEditables.includes(estado)}
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="name" className="font-bold">
              Stock
            </label>
            <div className="card flex">
              <InputText
                id="pnum"
                value={detalle.STR_ITEM.Stock}
                // onChange={(e) =>
                //   setDetalle((prevDetalle) => ({
                //     ...prevDetalle,
                //     STR_CANTIDAD: e.target.value,
                //     STR_SUBTOTAL: e.target.value * detalle.STR_ITEM?.Precio,
                //   }))
                // }
                useGrouping={false}
                disabled
                keyfilter="pnum"
                // disabled={
                //   !estadosEditables.includes(estado) | (usuario.TipoUsuario != 1)
                // }
              />
            </div>
          </div>
        </div>
        <div className="field">
          <label htmlFor="name" className="font-bold">
            Cantidad
          </label>
          <div className="card flex">
            <InputText
              id="pnum"
              value={detalle.STR_CANTIDAD}
              onChange={(e) =>
                setDetalle((prevDetalle) => ({
                  ...prevDetalle,
                  STR_CANTIDAD: e.target.value,
                  STR_SUBTOTAL: e.target.value * detalle.STR_ITEM?.Precio,
                }))
              }
              useGrouping={false}
              keyfilter="pnum"
              // disabled={
              //   !estadosEditables.includes(estado) | (usuario.TipoUsuario != 1)
              // }
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="name" className="font-bold">
            Costo
          </label>
          <div className="card flex">
            <InputNumber
              inputId="currency-us"
              value={detalle.STR_ITEM?.Precio}
              // onValueChange={(e) =>
              //   setDetalle((prevDetalle) => ({
              //     ...prevDetalle,
              //     STR_COSTO: e.target.value,
              //     STR_SUBTOTAL: e.target.value * detalle.STR_CANTIDAD,
              //   }))
              // }
              disabled
              // disabled={editable}
              mode="currency"
              currency={`${moneda}`}
              locale={
                moneda == "SOL" ? "en-PE" : moneda == "EUR" ? "de-DE" : "en-US"
              }
              //disabled={!estadosEditables.includes(estado)}
            />
          </div>
          {/* {submitted && detalle.precioUnitario == null && (
            <small className="p-error">Precio Unitario es requerido</small>
          )} */}
        </div>
        <div className="field">
          <label htmlFor="name" className="font-bold">
            Sub Total
          </label>
          <div className="card flex">
            <InputNumber
              inputId="currency-us"
              value={detalle.STR_SUBTOTAL}
              onValueChange={(e) =>
                setDetalle((prevDetalle) => ({
                  ...prevDetalle,
                  STR_SUBTOTAL: e.target.value,
                }))
              }
              // disabled={editable}
              mode="currency"
              currency={`${moneda}`}
              locale={
                moneda == "SOL" ? "en-PE" : moneda == "EUR" ? "de-DE" : "en-US"
              }
              disabled
              //disabled={!estadosEditables.includes(estado)}
            />
          </div>
          {/* {submitted && detalle.precioUnitario == null && (
            <small className="p-error">Precio Unitario es requerido</small>
          )} */}
        </div>
        <div className="field">
          <label htmlFor="name" className="font-bold">
            Fecha Requerida
          </label>
          <div className="card flex">
            <Calendar
              value={detalle.STR_FECHAREQ}
              onChange={(e) =>
                setDetalle((prevDetalle) => ({
                  ...prevDetalle,
                  STR_FECHAREQ: e.target.value,
                }))
              }
              dateFormat="dd/mm/yy"
              locale="es"
            />
          </div>
          {/* {submitted && detalle.precioUnitario == null && (
            <small className="p-error">Precio Unitario es requerido</small>
          )} */}
        </div>
        <div className="field">
          <label htmlFor="name" className="font-bold">
            Unidad de Negocio
          </label>
          <div className="card flex">
            <Dropdown
              value={detalle.STR_DIM1}
              onChange={(e) => {
                setDetalle((prevDetalle) => ({
                  ...prevDetalle,
                  STR_DIM1: e.target.value,
                }));
                //validaIgualdadEnDetalle(e.target.value);
              }}
              options={dim1}
              optionLabel="name"
              placeholder="Unidad de Negocio"
              filter
              filterBy="id,name"
              valueTemplate={selectedOptionTemplate}
              itemTemplate={complementoOptionTemplate}
              className="w-full md:w-14rem"
              //disabled={editable}
              //disabled={!estadosEditables.includes(estado)}
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="name" className="font-bold">
            Filial
          </label>
          <div className="card flex">
            <Dropdown
              value={detalle.STR_DIM2}
              onChange={(e) => {
                setDetalle((prevDetalle) => ({
                  ...prevDetalle,
                  STR_DIM2: e.target.value,
                }));
                //validaIgualdadEnDetalle(e.target.value);
              }}
              options={dim2}
              optionLabel="name"
              placeholder="Filial"
              filter
              filterBy="id,name"
              valueTemplate={selectedOptionTemplate}
              itemTemplate={complementoOptionTemplate}
              className="w-full md:w-14rem"
              //disabled={editable}
              //disabled={!estadosEditables.includes(estado)}
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="name" className="font-bold">
            Área
          </label>
          <div className="card flex">
            <Dropdown
              value={detalle.STR_DIM4}
              onChange={(e) => {
                setDetalle((prevDetalle) => ({
                  ...prevDetalle,
                  STR_DIM4: e.target.value,
                }));
                //validaIgualdadEnDetalle(e.target.value);
              }}
              options={dim4}
              optionLabel="name"
              placeholder="Área"
              filter
              filterBy="id,name"
              valueTemplate={selectedOptionTemplate}
              itemTemplate={complementoOptionTemplate}
              className="w-full md:w-14rem"
              //disabled={editable}
              //disabled={!estadosEditables.includes(estado)}
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="name" className="font-bold">
            Centro de Costo
          </label>
          <div className="card flex">
            <Dropdown
              value={detalle.STR_DIM5}
              onChange={(e) => {
                setDetalle((prevDetalle) => ({
                  ...prevDetalle,
                  STR_DIM5: e.target.value,
                }));
                //validaIgualdadEnDetalle(e.target.value);
              }}
              options={dim5}
              optionLabel="name"
              placeholder="Centro de Costo"
              filter
              filterBy="id,name"
              valueTemplate={selectedOptionTemplate}
              itemTemplate={complementoOptionTemplate}
              className="w-full md:w-14rem"
              //disabled={editable}
              //disabled={!estadosEditables.includes(estado)}
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="name" className="font-bold">
            Comentarios
          </label>
          <div className="card flex">
            <InputTextarea
              autoResize
              value={detalle.STR_COMENTARIO}
              onChange={(e) =>
                setDetalle((prevDetalle) => ({
                  ...prevDetalle,
                  STR_COMENTARIO: e.target.value,
                }))
              }
              rows={5}
              cols={30}
              //disabled={editable}
              //disabled={!estadosEditables.includes(solicitudRD.estado)}
            />
          </div>
        </div>
      </Dialog>
      <Dialog
        visible={deleteProductDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deleteProductDialogFooter}
        onHide={hideDeleteProductDialog}
        //disabled={!estadosEditables.includes(estado)}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {detalle && <span>¿Estás seguro que quieres eliminar?</span>}
        </div>
      </Dialog>

      <Dialog
        visible={deleteProductsDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deleteProductsDialogFooter}
        onHide={hideDeleteProductsDialog}
        //disabled={!estadosEditables.includes(estado)}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {detalle && <span>¿Estás seguro que quieres eliminar?</span>}
        </div>
      </Dialog>
    </>
  );
}
