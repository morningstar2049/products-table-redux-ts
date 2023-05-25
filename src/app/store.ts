import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

interface ProductsInterface {
  id: number;
  product_code: string;
  description: string;
  imageURL: string;
}

interface InitialStateInterface {
  products: ProductsInterface[];
  sortOrder: ProductsInterface[];
}

export const fetchProduct = createAsyncThunk(
  "products/fetch",
  async (thunkApi) => {
    if (!localStorage.getItem("sortOrder")) {
      const response = await fetch("http://localhost:3000/products", {
        method: "GET",
      });
      const data = await response.json();
      localStorage.setItem("sortOrder", JSON.stringify(data));
      return data;
    } else {
      return JSON.parse(localStorage.getItem("sortOrder") as string);
    }
  }
);

const initialState: InitialStateInterface = {
  products: [],
  sortOrder: JSON.parse(localStorage.getItem("sortOrder") as string) || [],
};
export const ProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct(state, action) {
      state.products = [action.payload, ...state.products];
      localStorage.setItem(
        "sortOrder",
        JSON.stringify([action.payload, ...state.products])
      );
    },
    deleteProduct(state, action) {
      console.log("dleete");
      state.products = state.products.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("sortOrder", JSON.stringify(state.products));
      fetch(`http://localhost:3000/products/${action.payload}`, {
        method: "DELETE",
      });
    },
    dragSort(state, action) {
      state.products = [...action.payload];

      localStorage.setItem("sortOrder", JSON.stringify(state.products));
    },
    editDescription(state, action) {
      state.products = state.products.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, description: action.payload.description };
        } else return item;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.products = action.payload;
      if (!JSON.parse(localStorage.getItem("sortOrder") as string)) {
        localStorage.setItem("sortOrder", JSON.stringify(state.sortOrder));
      }
    });
  },
});
export const store = configureStore({
  reducer: { productReducer: ProductSlice.reducer },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const { addProduct, deleteProduct, editDescription, dragSort } =
  ProductSlice.actions;
