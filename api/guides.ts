import { gql } from '@apollo/client';
import { GUIDESINTERFACE } from './commonInterfaces';

const GUIDES = gql`
  query GUIDES {
    guides {
      id
      firstName: first_name
      lastName: last_name
      biography
      position
      professional {
        name
        alt: alternativeText
        url
        fragment: caption
        type: provider_metadata
      }
    }

    guidesTotal: guidesConnection {
      aggregate {
        totalCount
      }
    }
  }
`;

interface GUIDES_INTERFACE {
  guides: [GUIDESINTERFACE];
  guidesTotal: {
    aggregate: {
      totalCount: number;
    };
  };
}

export { GUIDES };
export type { GUIDES_INTERFACE };
