import React from "react";
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Table,
} from "@mui/material";
import TableRowComponent from "./TableRowComponent";
import { useAppSelector } from "../app/hooks";

const TableComponent = () => {
  const products = useAppSelector((state) => state.productReducer.products);

  return (
    <Table>
      <TableHead>
        <TableRow sx={{ backgroundColor: "yellow" }}>
          <TableCell sx={{ width: "10%" }}>"id"</TableCell>
          <TableCell sx={{ width: "30%" }}>description</TableCell>
          <TableCell sx={{ width: "20%" }}>code</TableCell>
          <TableCell sx={{ width: "20%" }}>image</TableCell>
          <TableCell sx={{ width: "10%" }}>delete</TableCell>
          <TableCell sx={{ width: "10%" }}>edit</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {products.map((item) => (
          <TableRowComponent
            key={item.id}
            id={item.id}
            product_code={item.product_code}
            description={item.description}
            imageURL={item.imageURL}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default TableComponent;
