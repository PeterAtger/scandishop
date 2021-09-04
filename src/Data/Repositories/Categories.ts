import { addCategoryToStore } from "../../Logic/Store/CategoriesReducer"
import store from "../../Logic/Store/store"
import client from "../Providers/ApolloClient"
import { CategoriesQuery } from "../Providers/Queries"

const fetchCategories = async () => {
    try {
        let response = await client.query(CategoriesQuery)
        for (let i = 0; i < response.data.categories.length; i++) {
            store.dispatch(addCategoryToStore(response.data.categories[i]))
        }
    } catch (e: any) {
        throw new Error(e)
    }
}

export default fetchCategories;