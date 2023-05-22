import "./App.css";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { useEffect } from "react";
import { fetchProduct } from "./app/store";

function App() {
  const products = useAppSelector((state) => state.productReducer.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  return (
    <div className="App">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>"id"</TableCell>
            <TableCell>code</TableCell>
            <TableCell>description</TableCell>
            <TableCell>image</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((item) => (
            <TableRow>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.product_code}</TableCell>
              <TableCell>{item.imageURL}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default App;
