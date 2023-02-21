import { gql } from '@apollo/client';
import { CARDMEDIAINTERFACE } from './commonInterfaces';

const TESTIMONIALS = gql`
  query TESTIMONIAL_REVIEWS {
    reviews(limit: 60) {
      id
      review
      traveller
      rating
    }
  }
`;
interface TESTIMONIAL_INTERFACE {
  reviews: [
    {
      id: string;
      title: string;
      review: string;
      traveller: string;
      rating: number;
    }
  ];
}

export { TESTIMONIALS };
export type { TESTIMONIAL_INTERFACE };
