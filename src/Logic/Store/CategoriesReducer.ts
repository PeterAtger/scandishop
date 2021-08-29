import { createSlice, Slice } from "@reduxjs/toolkit"
import { CategoryProps } from "../../Data/Models/DataModels"

type CategoriesSliceProps = CategoryProps[]


const CategoriesSlice: Slice<CategoriesSliceProps> = createSlice({
    name: 'Categories',
    initialState: [] as CategoryProps[],
    reducers: {
        addCategoryToStore: (Categories, action: { type: string, payload: CategoryProps }) => {
            Categories.push({
                name: action.payload.name,
                products: action.payload.products
            })
        }
    }
})

export const { addCategoryToStore } = CategoriesSlice.actions
export const categoriesReducer = CategoriesSlice.reducer