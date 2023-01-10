import React from 'react';
import { gql } from '@apollo/client';
import client from '../../apollo-client';
interface Props {
  data: ATTRACTION_SLUGS_INTERFACE;
  params: {
    slug: string;
  };
}
interface ATTRACTION_SLUGS_INTERFACE {
  cities: [attractions: [{ slug: string }]];
}
export async function getStaticProps({ params }: Props) {
  const { data } = await client.query<any>({
    query: gql`
      query ATTRACTION_SLUGS {
        cities {
          attractions {
            slug
          }
        }
      }
    `
  });

  return {
    props: {
      data
    }
  };
}

const Blogs = ({ data }: Props) => {
  const arr: any = [];
  const { cities: [...attractions] = [] } = data;
  attractions?.forEach((atr: any) => {
    atr.attractions.forEach((atr1: any) => {
      arr.push(atr1);
    });
  });
  console.log(arr);
  return <div>Blogs</div>;
};

export default Blogs;
