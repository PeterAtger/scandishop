import { currencyFill } from "../../Logic/Store/rootReducer";
import { CurrenciesProps } from "../Models/DataModels";
import client from "../Providers/ApolloClient";
import { CurrenciesQuery } from "../Providers/Queries";


const fillCurrencies = async () => {
    let currencyList: CurrenciesProps[] = [];
    let response = await client.query(CurrenciesQuery)
    console.log(response)
    currencyFill(currencyList)
}

export default fillCurrencies;

