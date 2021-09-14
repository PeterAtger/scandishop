import { createSlice, Slice } from "@reduxjs/toolkit";
import { CartProductsProps, ProductProps } from "../../Data/Models/DataModels";

type CartSliceProps = CartProductsProps[]

const CardSlice: Slice<CartSliceProps> = createSlice({
    name: 'Product',
    initialState: [] as CartProductsProps[],
    reducers: {
        addProductToCart: (CartState, action: { payload: { product: ProductProps, attributes: number[] }, type: string }) => {
            console.log(action.payload.product, action.payload.attributes)
            let found = false;
            if (CartState.length !== 0) {
                console.log(CartState)
                for (let i = 0; i < CartState.length && !found; i++) {
                    if (CartState[i].id === action.payload.product.id &&
                        JSON.stringify(CartState[i].selectedAttributes) === JSON.stringify(action.payload.attributes)) {
                        found = true;
                        CartState[i].quantaty++;
                    }
                }
                console.log(found)
                if (!found) {
                    CartState.push({
                        id: action.payload.product.id,
                        product: action.payload.product,
                        selectedAttributes: action.payload.attributes ? action.payload.attributes : new Array(10).fill(0),
                        quantaty: 1
                    })
                }
            } else {
                CartState.push({
                    id: action.payload.product.id,
                    product: action.payload.product,
                    selectedAttributes: action.payload.attributes ? action.payload.attributes : new Array(10).fill(0),
                    quantaty: 1
                })
            }

        },
        incrementQuantaty: (CartState, action: { payload: number, type: string }) => {
            CartState[action.payload].quantaty++
        },
        decrementQuantaty: (CartState, action: { payload: number, type: string }) => {
            CartState[action.payload].quantaty--
            if (CartState[action.payload].quantaty === 0) {
                CartState.splice(action.payload, 1)
            }
        },
        setCartAttributes: (CartState, action: { payload: { indexOfProduct: number, attributes: number[] }, type: string }) => {
            let found = false;
            for (let i = 0; i < CartState.length && !found; i++) {
                if (CartState[i].id === CartState[action.payload.indexOfProduct].id &&
                    JSON.stringify(CartState[i].selectedAttributes) === JSON.stringify(action.payload.attributes) &&
                    i !== action.payload.indexOfProduct) {
                    console.log('found something')
                    found = true;
                    CartState[i].quantaty = CartState[i].quantaty + CartState[action.payload.indexOfProduct].quantaty;
                    CartState.splice(action.payload.indexOfProduct, 1)
                }
            }
            if (CartState[action.payload.indexOfProduct]) CartState[action.payload.indexOfProduct].selectedAttributes = action.payload.attributes
        }
    },
})

export const { addProductToCart, incrementQuantaty, decrementQuantaty, setCartAttributes } = CardSlice.actions
export const cardReducer = CardSlice.reducer