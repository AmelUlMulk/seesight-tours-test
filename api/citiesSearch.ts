import { gql } from '@apollo/client';

const CITIESMODAL = gql`
  query CITIESMODAL {
    cities {
      id
      name
      slug
      card_media(limit: 1) {
        url
      }
    }
  }
`;
export default CITIESMODAL;
