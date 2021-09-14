import { ProductProps } from "../../Data/Models/DataModels";
import store from "../Store/store";
import { setCartAttributes } from "../Store/CartReducer";




class CartItemLogic {


    loadAttributes = (currentProduct: ProductProps, index: number) => {
        let categories: JSX.Element[] = [];

        // Load attributes
        if (currentProduct.attributes) {
            for (let i = 0; i < currentProduct.attributes.length; i++) {
                if (currentProduct.attributes[i].type === "text") {
                    let itemsList = []
                    for (let j = 0; j < currentProduct.attributes[i].items.length; j++) {
                        itemsList.push(
                            <div key={String(j)}
                                onClick={() => { let state = [...store.getState().cartReducer[index].selectedAttributes]; state[i] = j; store.dispatch(setCartAttributes({ indexOfProduct: index, attributes: state })) }}
                                className={j === store.getState().cartReducer[index].selectedAttributes[i] ? "selectable--selected" : "selectable--unselected"}>
                                {currentProduct.attributes[i].items[j].value}
                            </div>
                        )
                    }
                    categories.push(
                        <div className="title" key={String(i)}>
                            {currentProduct.attributes[i].name}
                            <div className="category">
                                {itemsList}
                            </div>
                        </div>
                    )
                } else if (currentProduct.attributes[i].type === "swatch") {
                    let itemsList = []
                    for (let j = 0; j < currentProduct.attributes[i].items.length; j++) {
                        itemsList.push(
                            <div key={String(j)}
                                className={j === store.getState().cartReducer[index].selectedAttributes[i] ? "" : "unselected-swatch"}>
                                <div
                                    onClick={() => { let state = [...store.getState().cartReducer[index].selectedAttributes]; state[i] = j; store.dispatch(setCartAttributes({ indexOfProduct: index, attributes: state })) }}
                                    style={{ backgroundColor: currentProduct.attributes[i].items[j].value, height: 45, width: 63 }}
                                    className="selectable--selected">
                                </div>
                            </div>
                        )
                    }
                    categories.push(
                        <div className="title" key={String(i)}>
                            {currentProduct.attributes[i].name}
                            <div key={String(i)} className="category">
                                {itemsList}
                            </div>
                        </div>
                    )
                }

            }
        }
        return categories;
    }


}

export default CartItemLogic