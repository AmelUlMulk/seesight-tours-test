import React, { ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';
import ProductDetails from './ProductDetails';
type WrapperProps = {
  title: string;
  children: ReactNode;
  slug?: string;
  name?: string;
};

const WRAPPER = styled.div`
  position: relative;
  z-index: 50;
  padding: 100px 146px;
  padding-bottom: 0;
  @media (max-width: 1500px) {
    padding: 70px 50px;
    padding-bottom: 0;
  }
  @media (max-width: 700px) {
    padding: 70px 10px;
    padding-bottom: 0;
  }
  /* padding-top: 100px !important; */
  padding-bottom: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 60vh;
`;

const SectionWrapper = ({ title, children, slug, name }: WrapperProps) => {
  const [productDetails, setProductDetails] = useState<boolean>(false);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setProductDetails(false);
    };
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolling]);
  return (
    <WRAPPER onScroll={() => setProductDetails(false)}>
      <ProductDetails
        open={productDetails}
        close={setProductDetails}
        slug={slug ? slug : ''}
      />
      {slug && (
        <h2
          className=" text-xl   md:text-2xl cursor-pointer  mt-8 text-white mb-2"
          onClick={() => setProductDetails(true)}
        >
          {name}
        </h2>
      )}
      <h1 className="md:text-3xl text-2xl  text-white mb-8">{title}</h1>
      {children}
    </WRAPPER>
  );
};

export default SectionWrapper;
