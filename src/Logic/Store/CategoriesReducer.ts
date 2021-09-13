import { createSlice, Slice } from "@reduxjs/toolkit"
import { CategoryProps, ProductProps } from "../../Data/Models/DataModels"

type CategoriesSliceProps = {
    allCategories: CategoryProps[],
    selectedCategory: number
}


const CategoriesSlice: Slice<CategoriesSliceProps> = createSlice({
    name: 'Categories',
    initialState: {
        allCategories: [] as CategoryProps[],
        selectedCategory: 1
    },
    reducers: {
        addCategoryToStore: (Categories, action: { type: string, payload: CategoryProps }) => {
            Categories.allCategories.push({
                name: action.payload.name,
                products: action.payload.products ? action.payload.products : []
            })
        },
        selectCategory: (Categories, action: { type: string, payload: number }) => {
            Categories.selectedCategory = action.payload
        },
        addProductsToCategory: (Categories, action: { type: string, payload: { products: ProductProps[], name: string } }) => {
            for (let i = 0; i < Categories.allCategories.length; i++) {
                if (Categories.allCategories[i].name === action.payload.name) {
                    Categories.allCategories[i].products = action.payload.products
                }
            }
        }
    }
})

export const { addCategoryToStore, selectCategory, addProductsToCategory } = CategoriesSlice.actions
export const categoriesReducer = CategoriesSlice.reducer