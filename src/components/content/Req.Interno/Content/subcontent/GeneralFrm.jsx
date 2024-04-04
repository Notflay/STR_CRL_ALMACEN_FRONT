import React from "react";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";

export function GeneralFrm({
  usuario,
  requerimiento,
  estados,
  setRequerimiento,
  selectedOptionTemplate,
  complementoOptionTemplate,
}) {
  return (
    <>
      <div className="grid">
        <div className="col-12 md:col-6 lg:col-3">
          <div className="mb-3 flex flex-column gap-2">
            <label htmlFor="countries">Fecha de Registro</label>
            <Calendar
              value={requerimiento.DocDate}
              readOnlyInput
              onChange={(e) => {
                setRequerimiento((prevRequerimiento) => ({
                  ...requerimiento,
                  DocDate: e.target.value,
                }));
              }}
              //disabled
              dateFormat="dd/mm/yy"
              //  disabled={editable}
              // minDate={getFechaLargo(fechaSolicitud)}
            />
          </div>
        </div>
        <div className="col-12 md:col-6 lg:col-3">
          <div className="mb-3 flex flex-column gap-2">
            <label htmlFor="countries">Fecha Requerida</label>
            <Calendar
              value={requerimiento.DocDueDate}
              readOnlyInput
              onChange={(e) => {
                setRequerimiento((prevRequerimiento) => ({
                  ...requerimiento,
                  DocDueDate: e.target.value,
                }));
              }}
              //disabled
              dateFormat="dd/mm/yy"
              //  disabled={editable}
              // minDate={getFechaLargo(fechaSolicitud)}
            />
          </div>
        </div>
        <div className="col-12 md:col-6 lg:col-3">
          <div className="mb-3 flex flex-column gap-2">
            <label htmlFor="countries">Solicitante</label>
            <div className="card flex">
              <InputText
                value={usuario.nombres + usuario.apellidos}
                //onChange={handleChangeRazonSocial}
                // onChange={(e) =>
                //   setDocumento((prevDocumento) => ({
                //     ...prevDocumento,
                //     razonSocial: e.target.value,
                //   }))
                // }
                disabled
                placeholder="Razon Social"
                className="w-12"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="grid">
        <div className="col-12 md:col-6 lg:col-3">
          <div className="mb-3 flex flex-column gap-2">
            <label htmlFor="countries">Filial</label>
            <div className="card flex">
              <InputText
                value={usuario.filial?.U_ST_NombreFilial}
                //onChange={handleChangeRazonSocial}
                // onChange={(e) =>
                //   setDocumento((prevDocumento) => ({
                //     ...prevDocumento,
                //     razonSocial: e.target.value,
                //   }))
                // }
                disabled
                placeholder="Filial"
                className="w-12"
              />
            </div>
          </div>
        </div>
        <div className="col-12 md:col-6 lg:col-3">
          <div className="mb-3 flex flex-column gap-2">
            <label htmlFor="countries">Estado</label>
            <div className="card flex">
              <Dropdown
                value={requerimiento.Estado}
                onChange={(e) => {
                  //setCompExisteSunat(false);
                }}
                options={estados}
                optionLabel="name"
                placeholder="Estado"
                valueTemplate={selectedOptionTemplate}
                itemTemplate={complementoOptionTemplate}
                className="w-full "
                disabled
                //disabled={!estadosEditables.includes(solicitudRD.estado)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
