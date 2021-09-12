import { gql } from "@apollo/client";

const CurrenciesQuery = {
  query: gql`
query  {
  currencies
  }
`
}


const CategoriesQuery = {
  query: gql`
  query{
    categories{
      name,
      products{
        id,
        name,
        inStock,
        gallery,
        attributes{
          id,
          name,
          type,
          items{
            displayValue,
            value,
            id
          }
        },
        prices{
          amount,
          currency
        },
        brand
      }
    }
  }
`
}

const ProductQuery = (id: string) => {
  return {
    query: gql`
    query{
      product(id:"${id}"){
      id
      name
      inStock
      gallery
      description
      prices{
          amount,
          currency
      }
      attributes{
        id,
        name,
        type,
        items{
          displayValue,
          value,
          id
        }
      },
      brand
      
    }
  }
    `
  }

}

export { CurrenciesQuery, CategoriesQuery, ProductQuery }