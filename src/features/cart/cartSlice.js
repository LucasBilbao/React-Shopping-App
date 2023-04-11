import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:5000/cartItems";

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (_, thunkAPI) => {
    try {
      const res = await axios(url);
      return res.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  extraReducers: {
    [getCartItems.pending](state) {
      state.isLoading = true;
    },
    [getCartItems.fulfilled](state, action) {
      state.cartItems = action.payload;
      state.isLoading = false;
    },
    [getCartItems.rejected](state) {
      state.isLoading = false;
    },
  },
  reducers: {
    clearCart(state) {
      state.cartItems = [];
    },
    removeItem(state, { payload }) {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== payload.id
      );
    },
    increase(state, { payload }) {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount += 1;
    },
    decrease(state, { payload }) {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount -= 1;
    },
    calculateTotals(state) {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });

      state.amount = amount;
      state.total = total;
    },
  },
});

// console.log(cartSlice);

export default cartSlice.reducer;
export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions;
