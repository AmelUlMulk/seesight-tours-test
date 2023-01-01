import Head from 'next/head';
import Image from 'next/image';
import { gql } from '@apollo/client';
import client from '../apollo-client';
interface IProps {
  blogs: any;
}
export default function Home({ blogs }: IProps) {
  return (
    <>
      <Head>
        <title className="text-3xl font-bold underline">See Sight Tours</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h2 className="text-3xl font-bold underline bg-red-400">
          This is Seesight Tours
        </h2>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query BLOGS_PAGE {
        blogsPage {
          id
          header
          subheader
          page_title
        }
      }
    `
  });
  return {
    props: {
      blogsPage: data.blogsPage
    }
  };
}
