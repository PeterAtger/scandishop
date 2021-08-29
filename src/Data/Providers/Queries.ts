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
        prices{
          amount,
          currency
        },
      }
    }
  }
`
}

export { CurrenciesQuery, CategoriesQuery }