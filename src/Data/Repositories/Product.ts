import { addProductToStore } from "../../Logic/Store/ProductReducers"
import store from "../../Logic/Store/store"
import client from "../Providers/ApolloClient"
import { ProductQuery } from "../Providers/Queries"



const fetchProduct = async (id: string) => {
    try {
        let response = await client.query(ProductQuery(id))
        store.dispatch(addProductToStore(response.data.product))
    } catch (e) {
        throw new Error(e)
    }
}

export default fetchProduct;