import { createSlice, Slice } from "@reduxjs/toolkit"
import { CategoryProps } from "../../Data/Models/DataModels"

type CategoriesSliceProps = {
    allCategories: CategoryProps[],
    selectedCategory: number
}


const CategoriesSlice: Slice<CategoriesSliceProps> = createSlice({
    name: 'Categories',
    initialState: {
        allCategories: [] as CategoryProps[],
        selectedCategory: 0
    },
    reducers: {
        addCategoryToStore: (Categories, action: { type: string, payload: CategoryProps }) => {
            Categories.allCategories.push({
                name: action.payload.name,
                products: action.payload.products
            })
        },
        selectCategory: (Categories, action: { type: string, payload: number }) => {
            Categories.selectedCategory = action.payload
        }
    }
})

export const { addCategoryToStore, selectCategory } = CategoriesSlice.actions
export const categoriesReducer = CategoriesSlice.reducer