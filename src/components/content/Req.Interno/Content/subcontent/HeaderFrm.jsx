import React from "react";
import { Divider } from "primereact/divider";

export function HeaderFrm({ esModoRegistrar, downloadAndOpenPdf, ruta }) {
  return (
    <div>
      <div className="flex  flex-wrap gap-2">
        <div className="flex text-2xl align-items-center gap-2">
          <i
            className="pi pi-chevron-left cursor-pointer"
            onClick={() => {
              navigate(ruta + "/solicitudes");
            }}
          ></i>
          <div>Requerimiento Interno</div>
        </div>

        {!esModoRegistrar && (
          <div className="flex text-2xl align-items-center gap-2 p-2">
            <Button
              type="button"
              icon="pi pi-file-pdf"
              severity="warning"
              rounded
              onClick={downloadAndOpenPdf}
              data-pr-tooltip="PDF"
            />
          </div>
        )}
        {/* {(solicitudRD.estado > 5) & (solicitudRD.estado != 7) && (
    <div className="flex text-2xl align-items-center gap-2 p-2">
      <Button
        type="button"
        icon="pi pi-file-pdf"
        severity="warning"
        rounded
        onClick={downloadAndOpenPdf}
        data-pr-tooltip="PDF"
      />
    </div>
  )} */}
      </div>
      <Divider />
    </div>
  );
}
