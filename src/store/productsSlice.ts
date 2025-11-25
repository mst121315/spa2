import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductWithMeta, ProductFilter } from '../types/product';
import { fetchProducts as apiFetchProducts, fetchProductById as apiFetchProductById } from '../api/products';

interface ProductsState {
  items: ProductWithMeta[];
  filter: ProductFilter;
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  filter: 'all',
  loading: false,
  error: null,
};

export const loadProducts = createAsyncThunk(
  'products/loadProducts',
  async () => {
    const products = await apiFetchProducts();
    return products;
  }
);

export const loadProductById = createAsyncThunk(
  'products/loadProductById',
  async (id: number) => {
    const product = await apiFetchProductById(id);
    return product;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<number>) => {
      const product = state.items.find(p => p.id === action.payload);
      if (product) {
        product.liked = !product.liked;
      }
    },

    deleteProduct: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(p => p.id !== action.payload);
    },

    addProduct: (state, action: PayloadAction<ProductWithMeta>) => {
      state.items.unshift({ ...action.payload });
    },

    setFilter: (state, action: PayloadAction<ProductFilter>) => {
      state.filter = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.map(p => ({ ...p, liked: false }));
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load products';
      })
      .addCase(loadProductById.fulfilled, (state, action) => {
        const exists = state.items.find(p => p.id === action.payload.id);
        if (!exists) {
          state.items.push({ ...action.payload, liked: false });
        }
      });
  }
});

export const { toggleLike, deleteProduct, addProduct, setFilter } = productsSlice.actions;
export default productsSlice.reducer;
