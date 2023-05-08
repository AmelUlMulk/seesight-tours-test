import { gql } from '@apollo/client';

const FETCH_PRODUCT_DETAILS = gql`
  query FETCH_PRODUCT_DETAILS($id: String!) {
    boatnew_products(where: { id: { _eq: $id } }) {
      rezdy {
        rezdy_id
      }
    }
  }
`;
export default FETCH_PRODUCT_DETAILS;
