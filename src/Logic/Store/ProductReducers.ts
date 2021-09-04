import { createSlice, Slice } from "@reduxjs/toolkit";
import { ProductProps } from "../../Data/Models/DataModels";

type ProductSliceProps = {
    allProducts: ProductProps[],
    currentProduct: number
}

const ProductSlice: Slice<ProductSliceProps> = createSlice({
    name: 'Product',
    initialState: {
        allProducts: [] as ProductProps[],
        currentProduct: 0
    },
    reducers: {
        addProductToStore: (ProductState, action: { payload: ProductProps, type: string }) => {
            ProductState.allProducts.push(action.payload)
        },
        selectProduct: (ProductState, action: { payload: number, type: string }) => {
            ProductState.currentProduct = (action.payload)
        }
    }
})

export const { addProductToStore, selectProduct } = ProductSlice.actions
export const productReducer = ProductSlice.reducer