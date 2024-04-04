import React, { useEffect, useRef, useState } from "react";
import { Toolbar } from "primereact/toolbar";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { Row } from "primereact/row";

export function DetalleRQ() {
  const dt = useRef(null);

  const totalColumns = () => {
    let total = 0;

    for (let sale of detalles) {
      total += sale.STR_SUBTOTAL;
    }

    return formatCurrency(total);
  };

  const footerGroup = (
    <ColumnGroup>
      <Row>
        <Column
          footer="Totales:"
          colSpan={3}
          footerStyle={{ textAlign: "right" }}
        />
        <Column footer={totalColumns} />
      </Row>
    </ColumnGroup>
  );

  return (
    <>
      <div>
        <div className="card">
          <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
          <DataTable
            ref={dt}
            //value={detalles}
            tableStyle={{ minWidth: "50rem" }}
            //selection={selectedDetalles}
            //onSelectionChange={(e) => setSelectedDetalles(e.value)}
            sortOrder={1}
            sortMode="single"
            footerColumnGroup={footerGroup}
            disabled={editable}
          >
            <Column
              header="#"
              headerStyle={{ width: "3rem" }}
              body={(data, options) => options.rowIndex + 1}
            ></Column>
            <Column field="STR_CODARTICULO.id" header="Cod Árticulo"></Column>
            <Column field="STR_CODARTICULO.name" header="Concepto"></Column>
            <Column
              field="STR_SUBTOTAL"
              header="Totales"
              sortable
              body={priceBodyTemplate}
            ></Column>
            <Column
              field="STR_INDIC_IMPUESTO.id"
              header="Indicador de Impuesto"
              //body={centCostoTemplate}
            ></Column>
            <Column field="STR_PROYECTO.id" header="Proyecto"></Column>
            <Column
              field="STR_CENTCOSTO.CostCenter"
              header="Centro de Costo"
            ></Column>
            <Column
              field="STR_CODARTICULO.posFinanciera"
              header="Posición Financiera"
            ></Column>
            <Column field="STR_CUP.U_CUP" header="CUP"></Column>
            <Column
              body={actionBodyTemplate}
              exportable={false}
              style={{ minWidth: "12rem" }}
            ></Column>
          </DataTable>
        </div>
      </div>
    </>
  );
}
