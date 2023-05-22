import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

interface InitialStateInterface {
  products: {
    id: number;
    product_code: string;
    description: string;
    imageURL: string;
  }[];
}

export const fetchProduct = createAsyncThunk(
  "products/fetch",
  async (thunkApi) => {
    const response = await fetch("http://localhost:3000/products", {
      method: "GET",
    });
    const data = await response.json();
    return data;
  }
);

const initialState: InitialStateInterface = { products: [] };
export const ProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.products = action.payload;
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
