import React from 'react';
import { PRIVACY_PAGE, PRIVACY_PAGE_INTERFACE } from '../api/privacyPage';
import PageHero from '../components/Contact/PageHero';
import client from '../apollo-client';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import styled from 'styled-components';
import Head from 'next/head';

export async function getStaticProps() {
  const { data } = await client.query<PRIVACY_PAGE_INTERFACE>(PRIVACY_PAGE);
  return {
    props: {
      privacyPage: data.privacyPage
    }
  };
}

const Privacy = ({ privacyPage }: PRIVACY_PAGE_INTERFACE) => {
  const PrivacyPage = styled.div`
    font-size: 1.1rem;
    width: 100%;
    max-width: 1280px;
    margin: auto;
    padding-top: 2.5rem;
    padding-bottom: 1rem;
    @media (max-width: 768px) {
      width: 88%;
      padding: 1.5rem 0;
    }
    @media (max-width: 1200px) {
      padding-left: 15px;
      padding-right: 15px;
    }
    margin: 0 auto;
    text-align: justify;
    @media (max-width: 768px) {
      text-align: left;
      overflow: scroll;
    }
    @media (max-width: 1300px) {
      padding-left: 25px;
      padding-right: 25px;
    }
    h2 {
      padding-top: 1rem;

      font-size: 2rem;
    }
    h3 {
      font-size: 1.4rem;
      @media (max-width: 768px) {
        font-size: 1.2rem;
      }
    }
    div {
      padding-bottom: 0.4rem;
    }
    ul {
      padding-left: 1.2rem;
      list-style: circle;
    }
    ol {
      list-style: circle;
      padding-left: 1.2rem;
    }

    a {
      color: #56b8e7;
    }
  `;

  return (
    <>
     <Head>
        <title>{PrivacyPage.pageTitle}</title>
        <meta
          property="og:description"
          content={PrivacyPage.metaDescription}
          key="metadescription"
        />
        <link href={PrivacyPage.canonical} rel="canonical" key="canonical" />
      </Head>
      <PageHero
        title={'Our Privacy Policy'}
        snippet={
          'This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data'
        }
        media={
          'https://res.cloudinary.com/see-sight-tours/image/upload/w_1440,h_500/t_header/f_auto,q_auto,/fl_progressive:steep/v1581438789/top-ottawa-Parliament-Buildings.webP'
        }
        video={false}
      />
      <section className="PrivacyPage-body">
        <PrivacyPage className="PrivacyPage 4xl:text-sm ">
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {privacyPage ? privacyPage?.content : ''}
          </ReactMarkdown>
        </PrivacyPage>
      </section>
    </>
  );
};

export default Privacy;
