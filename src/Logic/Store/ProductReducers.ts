import { createSlice, Slice } from "@reduxjs/toolkit";
import { ProductProps } from "../../Data/Models/DataModels";

type ProductSliceProps = {
    allProducts: ProductProps[],
    currentProduct: number,
    selectedImage: number,
    selectedAttributes: number[],

}

const ProductSlice: Slice<ProductSliceProps> = createSlice({
    name: 'Product',
    initialState: {
        allProducts: [] as ProductProps[],
        currentProduct: 0,
        selectedImage: 0,
        selectedAttributes: new Array(10).fill(0),
    },
    reducers: {
        addProductToStore: (ProductState, action: { payload: ProductProps, type: string }) => {
            ProductState.allProducts.push(action.payload)
        },
        selectProduct: (ProductState, action: { payload: number, type: string }) => {
            ProductState.currentProduct = (action.payload)
        },
        selectImage: (ProductState, action: { payload: number, type: string }) => {
            ProductState.selectedImage = (action.payload)
        },
        selectAtrributes: (ProductState, action: { payload: number[], type: string }) => {
            ProductState.selectedAttributes = (action.payload)
        },
    }
})

export const { addProductToStore, selectProduct, selectImage, selectAtrributes } = ProductSlice.actions
export const productReducer = ProductSlice.reducer