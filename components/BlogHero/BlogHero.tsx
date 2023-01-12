import styled from 'styled-components';
import Image from 'next/image';
import dayjs from 'dayjs';

interface IProps {
  title: string;
  snippet: string;
  media: any;
  publicationDate: any;
  author: any;
}
const BlogHero = ({
  title,
  snippet,
  media,
  publicationDate,
  author
}: IProps): JSX.Element => {
  const BlogHero = styled.div`
    height: 50vh;
    position: relative;
    &:before {
      background: black;
      content: '';
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
      z-index: 1;
      opacity: 0.5;
    }
    display: flex;
    .PageHero_container {
      position: absolute;
      left: 14%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      gap: 1rem;
      width: 100%;
      z-index: 1;
      h1 {
        font-size: 60px;
      }
      p {
        font-size: 30px;
      }
    }
  `;
  const StyledImage = styled(Image)`
    z-index: 0;
  `;
  return (
    <section className="Hero_Section opacity-80 ">
      <BlogHero className="BlogHero bg-no-repeat bg-cover bg-center flex justify-start items-center">
        <StyledImage alt="guidesImage" src={media} layout="fill" />
        <div className="PageHero_container flex flex-col pl-10 ">
          <div className="font-bold text-white">
            <h1>{title}</h1>
          </div>
          <div className="text-2xl text-white">
            <p>{snippet}</p>
          </div>
          <div className="text-md text-white">
            {`${dayjs(publicationDate).format('DD MMMM YYYY')} | ${author}`}
          </div>
        </div>
      </BlogHero>
    </section>
  );
};

export default BlogHero;
