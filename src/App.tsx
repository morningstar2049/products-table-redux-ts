import "./App.css";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { useEffect } from "react";
import { fetchProduct } from "./app/store";
import TableComponent from "./components/TableComponent";
import FormComponent from "./components/FormComponent";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  return (
    <div className="App">
      <FormComponent />
      <TableComponent />
    </div>
  );
}

export default App;
