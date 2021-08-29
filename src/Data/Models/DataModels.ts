interface CurrenciesProps {
    code: string,
    symbol: string
}

interface PriceProps {
    amount: number,
    currency: string
}
interface ProductProps {
    id: string,
    name: string,
    inStock: boolean,
    gallery: string[],
    prices: PriceProps[]
}

interface CategoryProps {
    name: string,
    products: ProductProps[]
}

export type { CurrenciesProps, CategoryProps }