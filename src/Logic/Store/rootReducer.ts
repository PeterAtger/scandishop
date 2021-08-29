import { createSlice } from "@reduxjs/toolkit";
import { CurrenciesProps } from "../../Data/Models/DataModels";

const slice = createSlice({
    name: 'Currencies',
    initialState: {
        allCurrencies: [] as CurrenciesProps[],
        selectedCurrency: {} as CurrenciesProps
    },
    reducers: {
        currencyFill: (Currencies, action: { payload: CurrenciesProps[], type: string }) => {
            for (let i = 0; i < action.payload.length; i++)
                Currencies.allCurrencies.push(action.payload[i])
        },
        selectCurrency: (Currencies, action: { payload: CurrenciesProps, type: string }) => {
            Currencies.selectedCurrency = action.payload
        }
    }
})

export const { currencyFill, selectCurrency } = slice.actions
export const currencyReducer = slice.reducer