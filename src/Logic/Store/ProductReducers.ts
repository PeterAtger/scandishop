import { createSlice, Slice } from "@reduxjs/toolkit";
import { ProductProps } from "../../Data/Models/DataModels";

type ProductSliceProps = ProductProps[]

const ProductSlice: Slice<ProductSliceProps> = createSlice({
    name: 'Product',
    initialState: [] as ProductSliceProps,
    reducers: {
        addProductToStore: (ProductState, action: { payload: ProductProps, type: string }) => {
            ProductState.push(action.payload)
        },
    }
})

export const { addProductToStore } = ProductSlice.actions
export const productReducer = ProductSlice.reducer