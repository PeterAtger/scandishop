import { addCategoryToStore, addProductsToCategory } from "../../Logic/Store/CategoriesReducer"
import store from "../../Logic/Store/store"
import client from "../Providers/ApolloClient"
import { CategoriesQuery, CategoryNamesQuery } from "../Providers/Queries"

const fetchCategoryNames = async () => {
    try {
        let response = await client.query(CategoryNamesQuery)
        store.dispatch(addCategoryToStore({ name: "All" }))
        for (let i = 0; i < response.data.categories.length; i++) {
            store.dispatch(addCategoryToStore(response.data.categories[i]))
        }
    } catch (e: any) {
        throw new Error(e)
    }
}

const fetchCategories = async (query: string) => {
    try {
        let response = await client.query(CategoriesQuery(query))
        store.dispatch(addProductsToCategory({ products: response.data.category.products, name: query }))
    } catch (e: any) {
        throw new Error(e)
    }
}

const fetchAllCategories = async () => {
    let allCategories = store.getState().categories.allCategories;
    let allItems = [];
    for (let i = 1; i < allCategories.length; i++) {
        if (allCategories[i].products?.length === 0) {
            try {
                let response = await client.query(CategoriesQuery(allCategories[i].name))
                store.dispatch(addProductsToCategory({ products: response.data.category.products, name: allCategories[i].name }))
                allItems.push(...response.data.category.products)
            } catch (e: any) {
                throw new Error(e)
            }
        } else {
            allItems.push(...allCategories[i].products!)
        }
    }
    store.dispatch(addProductsToCategory({ products: allItems, name: 'All' }))

}

export default fetchCategories;
export { fetchCategoryNames, fetchAllCategories }