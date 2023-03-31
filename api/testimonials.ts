import { gql } from '@apollo/client';
import { CARDMEDIAINTERFACE } from './commonInterfaces';

const TESTIMONIALS = gql`
  query TESTIMONIAL_REVIEWS {
    reviews(limit: 60) {
      id
      review
      title
      traveller
      rating
      date
      source
    }
  }
`;
const Our_Reviews = gql`
  query OUR_REVIEWS {
    reviews(limit: 60, sort: "date:desc") {
      id
      review
      title
      traveller
      rating
      date
      source
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
      source: string;
    }
  ];
}

export { TESTIMONIALS, Our_Reviews };
export type { TESTIMONIAL_INTERFACE };
