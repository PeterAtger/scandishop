interface CurrenciesProps {
    code: string,
    symbol: string
}

interface PriceProps {
    amount: number,
    currency: string
}

interface AttributeProps {
    id: string,
    name: string,
    type: 'text' | 'swatch',
    items: {
        id: string,
        value: string,
        displayValue: string
    }[]
}

interface ProductProps {
    id: string,
    name: string,
    inStock: boolean,
    gallery: string[],
    prices: PriceProps[],
    description?: string,
    attributes?: AttributeProps[],
    brand?: string
}

interface CategoryProps {
    name: string,
    products: ProductProps[]
}

interface CartProductsProps {
    id: string,
    product: ProductProps,
    selectedAttributes: number[],
    quantaty: number
}


export type { CurrenciesProps, CategoryProps, ProductProps, PriceProps, CartProductsProps }