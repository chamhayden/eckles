import React from 'react';
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import 'ag-grid-community/styles/ag-grid.css'; // Core CSS
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Theme

const Table = ({ data, maxWidth, ...props }) => {
  // Row Data: The data to be displayed.

  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const [rowData, setRowData] = React.useState([]);
  const [colDefs, setColDefs] = React.useState([]);

  React.useEffect(() => {
    setColDefs(
      data[0]
        .map((r) => {
          if (!r.showWidth || window.innerWidth > r.showWidth) {
            return {
              ...r,
              field: r.key,
              cellRenderer: r.render ?? undefined,
              data: undefined,
            };
          }
        })
        .filter((a) => a)
    );

    setRowData(
      data.map((r) => {
        const obj = {};
        r.forEach((c) => {
          obj[c.key] = c.data;
        });
        return obj;
      })
    );
  }, [window.innerWidth]);

  return (
    <div style={{ maxWidth: maxWidth ?? 900 }}>
      <AgGridReact
        domLayout={'autoHeight'}
        {...props}
        className="ag-theme-alpine"
        rowData={rowData}
        columnDefs={colDefs}
      />
    </div>
  );
};

export default Table;
