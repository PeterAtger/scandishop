import { createSlice, Slice } from "@reduxjs/toolkit";
import { CurrenciesProps } from "../../Data/Models/DataModels";

type currencySliceProps = {
    allCurrencies: CurrenciesProps[];
    selectedCurrency: CurrenciesProps;
}

const currencySlice: Slice<currencySliceProps> = createSlice({
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

export type { currencySliceProps }
export const { currencyToStore, selectCurrency } = currencySlice.actions
export const currencyReducer = currencySlice.reducer