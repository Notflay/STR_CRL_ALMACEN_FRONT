import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";

export function FormDetalle({ setProductDialog, setDetalle, setSubmitted }) {
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
    setDetalle(emptyProduct);
  };

  return <></>;
}
