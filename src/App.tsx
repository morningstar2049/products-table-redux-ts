import "./App.css";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { useEffect } from "react";
import { fetchProduct } from "./app/store";
import TableComponent from "./components/TableComponent";
import FormComponent from "./components/FormComponent";
import { Container } from "@mui/material";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  return (
    <Container maxWidth={"xl"}>
      <FormComponent />
      <TableComponent />
    </Container>
  );
}

export default App;
