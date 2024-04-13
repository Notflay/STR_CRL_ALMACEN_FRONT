import React from "react";
import { Divider } from "primereact/divider";
import { useNavigate } from "react-router-dom";

export function HeaderFrm({ esModoRegistrar, downloadAndOpenPdf, ruta }) {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex  flex-wrap gap-2">
        <div className="flex text-2xl align-items-center gap-2">
          <i
            className="pi pi-chevron-left cursor-pointer"
            onClick={() => {
              navigate(ruta + `/reqInterno`);
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
