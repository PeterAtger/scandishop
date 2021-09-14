import { PriceProps, ProductProps } from "../../Data/Models/DataModels";
import parse from 'html-react-parser';
import store from "../Store/store";
import { selectAtrributes, selectImage } from "../Store/ProductReducers";




class ProductDetailsLogic {

    constructor() {
        store.dispatch(selectImage(0));
        store.dispatch(selectAtrributes(new Array(10).fill(0)))
    }


    loadAttributes = (currentProduct: ProductProps) => {
        let categories: JSX.Element[] = [];

        // Load attributes
        if (currentProduct.attributes) {
            for (let i = 0; i < currentProduct.attributes.length; i++) {
                if (currentProduct.attributes[i].type === "text") {
                    let itemsList = []
                    for (let j = 0; j < currentProduct.attributes[i].items.length; j++) {
                        itemsList.push(
                            <div key={String(j)}
                                onClick={() => { let state = [...store.getState().products.selectedAttributes]; state[i] = j; store.dispatch(selectAtrributes(state)) }}
                                className={j === store.getState().products.selectedAttributes[i] ? "selectable--selected" : "selectable--unselected"}>
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
                                className={j === store.getState().products.selectedAttributes[i] ? "" : "unselected-swatch"}>
                                <div
                                    onClick={() => { let state = [...store.getState().products.selectedAttributes]; state[i] = j; console.log(state); store.dispatch(selectAtrributes(state)) }}
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

    loadData = () => {
        let images: JSX.Element[] = [];
        let title: string = "";
        let subTitle: string = "";
        let price: PriceProps = { amount: 0, currency: '' };
        let categories: JSX.Element[] = [];
        let description: string | JSX.Element | JSX.Element[] = "";
        let inStock: boolean = true;
        if (!store.getState().loading.isLoading) {
            let currentProduct = store.getState().products.allProducts[store.getState().products.currentProduct]
            for (let i = 0; i < currentProduct.gallery.length; i++) {
                images.push(
                    <img onClick={() => { store.dispatch(selectImage(i)) }}
                        key={String(i)} className="image" src={currentProduct.gallery[i]}
                        alt={`${currentProduct.id} ${i}`} />)
            }
            title = currentProduct.brand ? currentProduct.brand : ""
            subTitle = currentProduct.name
            price = currentProduct.prices.filter((value: { currency: any; }) => value.currency === store.getState().currency.selectedCurrency.code)[0]
            categories = this.loadAttributes(currentProduct)
            description = parse(currentProduct.description!)
            inStock = currentProduct.inStock
        }
        return ({ title, subTitle, price, images, categories, description, inStock })
    }
}

export default ProductDetailsLogic