import { createSlice } from "@reduxjs/toolkit";
import { CurrenciesProps } from "../../Data/Models/DataModels";

const slice = createSlice({
    name: 'Currencies',
    initialState: {
        allCurrencies: [] as CurrenciesProps[],
        selectedCurrency: {} as CurrenciesProps
    },
    reducers: {
        currencyToStore: (Currencies, action: { payload: CurrenciesProps, type: string }) => {
            Currencies.allCurrencies.push(action.payload)
        },
        selectCurrency: (Currencies, action: { payload: CurrenciesProps, type: string }) => {
            Currencies.selectedCurrency = action.payload
        }
    }
})

export const { currencyToStore, selectCurrency } = slice.actions
export const currencyReducer = slice.reducer