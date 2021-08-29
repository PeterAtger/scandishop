import { gql } from "@apollo/client";

const CurrenciesQuery = {
  query: gql`
query  {
  currencies
  }
`
}


export { CurrenciesQuery }