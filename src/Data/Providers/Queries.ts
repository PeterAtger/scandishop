import { gql } from "@apollo/client";

const CurrenciesQuery = {
  query: gql`
query  {
  currencies
  }
`
}

const CategoryNamesQuery = {
  query: gql`
  query{
    categories{
      name,
    }
  }
`
}




const CategoriesQuery = (categoryName: string) => ({
  query: gql`
  query{
    category(input:{title:"${categoryName}"}){
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
})

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

export { CurrenciesQuery, CategoriesQuery, ProductQuery, CategoryNamesQuery }