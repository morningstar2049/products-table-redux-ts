import React from "react";
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Table,
} from "@mui/material";
import { useAppSelector } from "../app/hooks";

const TableComponent = () => {
  const products = useAppSelector((state) => state.productReducer.products);

  return (
    <Table sx={{ width: "80%", margin: "auto" }}>
      <TableHead>
        <TableRow sx={{ backgroundColor: "yellow" }}>
          <TableCell sx={{ width: "25%" }}>"id"</TableCell>
          <TableCell sx={{ width: "25%" }}>description</TableCell>
          <TableCell sx={{ width: "25%" }}>code</TableCell>
          <TableCell sx={{ width: "25%" }}>image</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {products.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.description}</TableCell>
            <TableCell>{item.product_code}</TableCell>
            <TableCell>
              <img
                src={item.imageURL}
                style={{ width: "200px", height: "100px" }}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableComponent;
