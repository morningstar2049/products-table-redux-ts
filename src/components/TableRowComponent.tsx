import React, { useState } from "react";
import { TableCell, TableRow, Table, TextField } from "@mui/material";
import {
  RiDeleteBin6Line,
  RiDeleteBin6Fill,
  RiEdit2Line,
  RiEdit2Fill,
} from "react-icons/ri";
import { GrEdit } from "react-icons/gr";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { deleteProduct, editDescription } from "../app/store";

interface TableRowProps {
  id: number;
  description: string;
  imageURL: string;
  product_code: string;
}

const TableRowComponent: React.FC<TableRowProps> = (props) => {
  const dispatch = useAppDispatch();
  const [hover, setHover] = useState<boolean>(false);
  const [hoverEdit, setHoverEdit] = useState<boolean>(false);
  const [openEditor, setOpenEditor] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  function descriptionToggle(id: number) {
    setText(props.description);
    setOpenEditor((prev) => !prev);
    if (openEditor) {
      fetch(`http://localhost:3000/products/${id}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        // Fields that to be updated are passed
        body: JSON.stringify({
          description: text,
        }),
      });

      dispatch(editDescription({ id, description: text }));
    }
  }

  return (
    <TableRow key={props.id}>
      <TableCell>{props.id}</TableCell>
      <TableCell>
        {openEditor ? (
          <TextField
            // onChange={() => {
            //   setText();
            //   fetch(patch)
            // }}
            value={text}
            onChange={(e) => setText(e.target.value)}
            sx={{ width: "100%", padding: "1px" }}
          />
        ) : (
          <p>{props.description}</p>
        )}
      </TableCell>
      <TableCell>{props.product_code}</TableCell>
      <TableCell>
        <img
          src={props.imageURL}
          alt="product image"
          style={{ width: "200px", height: "100px" }}
        />
      </TableCell>
      <TableCell
        sx={{ cursor: "pointer" }}
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
      >
        {hover ? (
          <RiDeleteBin6Fill
            size={30}
            onClick={() => dispatch(deleteProduct(props.id))}
          />
        ) : (
          <RiDeleteBin6Line size={30} />
        )}
      </TableCell>
      <TableCell
        sx={{ cursor: "pointer" }}
        onMouseEnter={() => {
          setHoverEdit(true);
        }}
        onMouseLeave={() => {
          setHoverEdit(false);
        }}
      >
        {hoverEdit ? (
          <RiEdit2Fill size={30} onClick={() => descriptionToggle(props.id)} />
        ) : (
          <RiEdit2Line size={30} />
        )}
      </TableCell>
    </TableRow>
  );
};

export default TableRowComponent;
