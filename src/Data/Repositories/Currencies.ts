import { currencyToStore, selectCurrency } from "../../Logic/Store/rootReducer";
import { CurrenciesProps } from "../Models/DataModels";
import client from "../Providers/ApolloClient";
import { CurrenciesQuery } from "../Providers/Queries";
import getSymbolFromCurrency from 'currency-symbol-map'
import store from "../../Logic/Store/store";


const fillCurrencies = async () => {
    try {
        let response = await client.query(CurrenciesQuery)
        for (let i = 0; i < response.data.currencies.length; i++) {
            let currency: CurrenciesProps = {
                code: response.data.currencies[i],
                symbol: getSymbolFromCurrency(response.data.currencies[i])
            }
            store.dispatch(currencyToStore(currency))
            if (i === 0)
                store.dispatch(selectCurrency(currency))
        }
    } catch (e) {
        console.log(e)
    }
}

export default fillCurrencies;

