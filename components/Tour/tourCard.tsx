import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { PAGE_OPTIONS } from '../Trust/Trustbar';
interface IProps {
  product: Record<string, any>;
  productType?: string;
}
const PriceContainerStyle = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  color: #fd5d5a;
  border-top-right-radius: 0.35rem;
  border-bottom-left-radius: 0.5rem;
  text-align: center;
  background-color: white;
  border: 2px solid #fd5d5a;
  z-index: 2000;
`;
export const SnippetStyle = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
const TourCard = ({ product, productType }: IProps) => {
  // REVIEWS AVG
  let totalAvg = 0;
  let total = 0;
  if (product?.reviews) {
    product?.reviews.forEach((review: any) => {
      total += Number(review?.rating);
    });
    totalAvg = Number((total / product?.reviews?.length).toFixed(1));
  }

  return (
    <div
      id="tour-section"
      className="mt-10 relative flex flex-col bg-[#FFFF] rounded-lg"
    >
      <div className="flex-none h-[60%] w-[95%] py-2 mx-auto">
        <Link href={`/tours/${product?.slug}`} className="rounded-md h-[100%]">
          <div className="w-[100%] h-[100%] relative rounded-lg !overflow-hidden">
            <PriceContainerStyle
              id="price_container"
              className="lg:py-1 lg:px-6 2xl:py- 2xl:px-8 lg:text-md lg:font-[500]"
            >
              From ${product?.price}
            </PriceContainerStyle>
            <Image
              src={product?.cardMedia[0].url}
              width={400}
              height={400}
              alt="feature product image"
              className="w-[100%] h-[100%] object-cover rounded-lg hover:scale-105 ease-in-out duration-200"
            />
          </div>
        </Link>
      </div>

      <div
        id="description"
        className="flex flex-col w-[95%] mx-auto lg:h-[40%] 2xl:h-[25%]"
      >
        <div id="heading">
          <h2 className="text-xl font-[500]">{product?.name}</h2>
        </div>
        <div id="snippet">
          <SnippetStyle>
            {product?.name.length < 120
              ? product?.cardSnippet.length < 115
                ? `${product?.cardSnippet}`
                : `${product?.cardSnippet
                    ?.split('')
                    ?.slice(0, 97)
                    ?.join('')}...`
              : product?.cardSnippet.length < 120
              ? `${product?.cardSnippet}`
              : `${product?.cardSnippet?.split('')?.slice(0, 95)?.join('')}...`}
          </SnippetStyle>
        </div>
      </div>
      <div className="flex-none h-[5%]">
        <div id="rating_container" className="w-[95%] mx-auto">
          <div className="flex">
            <div id="tour-time">
              <p className="text-sky-400 font-[400]">
                {productType !== PAGE_OPTIONS.MULTIDAY_TOUR_PAGE
                  ? product?.duration && `${product?.duration} Hours`
                  : `${Number(product?.duration) / 24} Days`}
              </p>
            </div>
            {product?.reviews?.length > 0 && (
              <div className="flex px-2">
                <p className="px-1">{`${totalAvg}/5`}</p>
                <Image
                  src="/homestar.svg"
                  width={15}
                  height={15}
                  alt="rating star"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div id="checkout_buttons" className="flex gap-2 w-[95%] mx-auto py-2">
        <div className="md:flex-none md:w-[50%]">
          <button className="text-start w-[100%] font-[500] lg:py-1 2xl:text-lg bg-white text-[#222222] border-none rounded-md">
            <Link href={`/tours/${product.slug}`}>See More</Link>
          </button>
        </div>
        <div className="md:flex-none md:w-[50%]">
          <button className=" w-[100%] font-[500] lg:py-1 lg:px-6 2xl:px-6 2xl:text-lg bg-red-500 text-white rounded-md">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
