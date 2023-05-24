import React from "react";
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Table,
} from "@mui/material";
import TableRowComponent from "./TableRowComponent";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { dragSort } from "../app/store";

const TableComponent = () => {
  const products = useAppSelector((state) => state.productReducer.products);
  const dispatch = useAppDispatch();

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    if (active.id !== over!.id) {
      const activeIndex = products.reduce((acc, cur, index) => {
        if (cur.id === active!.id) {
          acc = index;
        }
        return acc;
      }, -1);
      const overIndex = products.reduce((acc, cur, index) => {
        if (cur.id === over!.id) {
          acc = index;
        }
        return acc;
      }, -1);

      dispatch(dragSort(arrayMove(products, activeIndex, overIndex)));
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "yellow" }}>
            <TableCell sx={{ width: "6%" }}>"id"</TableCell>
            <TableCell sx={{ width: "30%" }}>description</TableCell>
            <TableCell sx={{ width: "20%" }}>code</TableCell>
            <TableCell sx={{ width: "20%" }}>image</TableCell>
            <TableCell sx={{ width: "8%" }}>delete</TableCell>
            <TableCell sx={{ width: "8%" }}>edit</TableCell>
            <TableCell sx={{ width: "8%" }}>drag</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <SortableContext
            items={products}
            strategy={verticalListSortingStrategy}
          >
            {products.map((item) => (
              <TableRowComponent
                key={item.id}
                id={item.id}
                product_code={item.product_code}
                description={item.description}
                imageURL={item.imageURL}
              />
            ))}
          </SortableContext>
        </TableBody>
      </Table>
    </DndContext>
  );
};

export default TableComponent;
