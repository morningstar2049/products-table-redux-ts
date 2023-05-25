import React, { useEffect, useState } from "react";
import { Box, TableCell, TableRow, TextField } from "@mui/material";
import { CSS } from "@dnd-kit/utilities";
import {
  RiDeleteBin6Line,
  RiDeleteBin6Fill,
  RiEdit2Line,
  RiEdit2Fill,
} from "react-icons/ri";
import { useAppDispatch } from "../app/hooks";
import { deleteProduct, editDescription } from "../app/store";
import { useSortable } from "@dnd-kit/sortable";
import { GrDrag } from "react-icons/gr";

interface TableRowProps {
  id: number;
  description: string;
  imageURL: string;
  product_code: string;
}

const TableRowComponent: React.FC<TableRowProps> = (props) => {
  const dispatch = useAppDispatch();
  const [hover, setHover] = useState(false);
  const [hoverEdit, setHoverEdit] = useState(false);
  const [openEditor, setOpenEditor] = useState(false);
  const [text, setText] = useState<string>("");
  function descriptionToggle() {
    setText(props.description);
    setOpenEditor((prev) => !prev);
  }

  useEffect(() => {
    let timeoutDebouncing: NodeJS.Timeout;
    let timeoutEditClose: NodeJS.Timeout;
    if (text) {
      timeoutDebouncing = setTimeout(() => {
        fetch(`http://localhost:3000/products/${props.id}`, {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description: text,
          }),
        });

        dispatch(editDescription({ id: props.id, description: text }));
      }, 800);

      timeoutEditClose = setTimeout(() => {
        setOpenEditor(false);
      }, 1500);
    }

    return () => {
      if (text) {
        clearTimeout(timeoutDebouncing);
        clearTimeout(timeoutEditClose);
      }
    };
  }, [text, dispatch, props.id]);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  return (
    <TableRow
      sx={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      <TableCell>{props.id}</TableCell>
      <TableCell>
        {openEditor ? (
          <TextField
            value={text}
            onChange={(e) => setText(e.target.value)}
            sx={{ width: "100%", padding: "1px" }}
          />
        ) : (
          <p onClick={descriptionToggle} style={{ cursor: "pointer" }}>
            {props.description}
          </p>
        )}
      </TableCell>
      <TableCell>{props.product_code}</TableCell>
      <TableCell>
        <img
          src={props.imageURL}
          alt="product"
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
            onClick={() => {
              dispatch(deleteProduct(props.id));
              console.log("clicked deelteed");
            }}
          />
        ) : (
          <RiDeleteBin6Line
            size={30}
            onClick={() => {
              dispatch(deleteProduct(props.id));
              console.log("clicked deelteed");
            }}
          />
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
          <RiEdit2Fill size={30} onClick={() => descriptionToggle()} />
        ) : (
          <RiEdit2Line size={30} />
        )}
      </TableCell>
      <TableCell
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        // sx={{
        //   transform: CSS.Transform.toString(transform),
        //   transition,
        // }}
      >
        <GrDrag size={30} style={{ cursor: "pointer" }} />
      </TableCell>
    </TableRow>
  );
};

export default TableRowComponent;
