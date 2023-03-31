import Link from 'next/link';
import React, { useState } from 'react';
import { CityInterface } from '../../api/citiesPage';
import CardSnippet from '../CardSnippet/CardSnippet';
import Image from 'next/image';
import styled from 'styled-components';
interface CityCard extends CityInterface {
  index: number;
}
interface CardProps {
  large: boolean;
}

const StyledDiv = styled.div<CardProps>`
  @media (min-width: 1500px) {
    width: ${props => (props.large ? '38%' : '29%')} !important;
  }
  width: 350px;
  @media (max-width: 752px) {
    width: 500px;
  }
  @media (max-width: 652px) {
    width: 90%;
  }
`;
const largerCardIndexes = [1, 3, 7, 11, 13, 15, 19, 21];
const CityCard = ({ city, index }: CityCard) => {
  const [largeCard] = useState<boolean>(() =>
    largerCardIndexes.includes(index) ? true : false
  );

  const [showSnippet, setShowSnippet] = useState(false);

  return (
    <>
      <StyledDiv
        large={largeCard}
        onMouseEnter={() => {
          if (!showSnippet) {
            setShowSnippet(true);
          }
        }}
        onMouseLeave={() => setShowSnippet(false)}
      >
        <div
          id="image_wrapper"
          className="w-[100%] h-[100%] rounded relative !overflow-hidden"
        >
          <Link href={city?.slug}>
            <Image
              src={city?.cardMedia[0]?.url}
              width={500}
              height={340}
              quality={100}
              alt={city?.cardMedia[0]?.alt}
              className="w-[100%] h-[100%] rounded hover:scale-105 ease-in-out duration-200"
            />
          </Link>
          <CardSnippet
            text={city.cardSnippet}
            name={city.name}
            showSnippet={showSnippet}
            setShowSnippet={setShowSnippet}
            slug={city.slug}
          />
        </div>
      </StyledDiv>
    </>
  );
};

export default CityCard;
