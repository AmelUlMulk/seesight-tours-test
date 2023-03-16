import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Router from 'next/router';
import CardSnippet from './CardSnippet/CardSnippet';
const CityCards = styled.div`
  margin-top: 1.5rem;
  min-width: 32%;
  min-height: 400px;
  img {
    height: 100%;
  }
  @media (max-width: 1500px) {
    margin-top: 1.5rem;
  }
  button {
    position: absolute;
  }
`;

const StyledImage = styled(Image)`
  z-index: 0;
  height: 100%;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  object-fit: cover;
`;
interface CARD_INTERFACE {
  slug: string;
  image: string;
  cardSnippet: string;
  city: string;
}
const Card = ({ slug, image, cardSnippet, city }: CARD_INTERFACE) => {
  const [showSnippet, setShowSnippet] = useState(false);
  return (
    <CityCards
      onClick={() => Router.push(slug)}
      className="rounded relative !overflow-hidden overflow-x-auto shadow-lg cursor-pointer "
      onMouseEnter={() => setShowSnippet(true)}
      onMouseLeave={() => setShowSnippet(false)}
    >
      <StyledImage
        src={image}
        alt={image}
        width={400}
        height={500}
        quality={100}
        className="w-[100%] absolute  h-[100%] rounded hover:scale-105 ease-in-out duration-200"
      />

      <CardSnippet
        text={cardSnippet}
        name={city}
        showSnippet={showSnippet}
        setShowSnippet={setShowSnippet}
      />
    </CityCards>
  );
};

export default Card;
