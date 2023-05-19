import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

const ProductList = ({
  products,
  onSelect,
  keyExtractor,
  onPageChange,
  currentPage,
  totalPages,
}) => {
  const columns = [
    { field: "id", headerName: "ID", width: 300 },
    { field: "name", headerName: "Name", width: 300 },
    { field: "category_level_1", headerName: "Category", width: 300 },
    {
      field: "mrp",
      headerName: "Price",
      type: "number",
      width: 200,
      valueGetter: (params) =>
        params.row.mrp.mrp ? params.row.mrp.mrp.toString() : "",
    },
    {
      field: "images",
      headerName: "Image",
      width: 150,
      renderCell: (params) => {
        let imageUrl = "";
        if (params.value.front) {
          imageUrl = params.value.front;
        } else if (params.value.back) {
          imageUrl = params.value.back;
        } else if (params.value.top) {
          imageUrl = params.value.top;
        } else if (params.value.bottom) {
          imageUrl = params.value.bottom;
        } else if (params.value.left) {
          imageUrl = params.value.left;
        } else if (params.value.right) {
          imageUrl = params.value.right;
        } else if (params.value.top_left) {
          imageUrl = params.value.top_left;
        } else if (params.value.top_right) {
          imageUrl = params.value.top_right;
        }

        return <img className='img' src={imageUrl} alt="Product" height={50} />;
      },
    },
  ];

  const rows = products.map((product, index) => ({
    ...product,
    id: keyExtractor(product, index),
  }));

  const handlePageChange = (page) => {
    onPageChange(page);
    document.documentElement.scrollTop = "0px";
  };

  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        columns={columns}
        rows={rows}
        pageSize={10}
        checkboxSelection
        autoHeight
        getRowId={keyExtractor}
        onRowClick={(params) => onSelect(params.row)}
      />
      <div
        style={{ display: "flex", justifyContent: "center", margin: "1rem" }}
      >
        <button
          className="btn"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="btn"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
