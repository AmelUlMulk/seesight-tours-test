import CitiesSwiperDesk from './CitiesSwiperDesk';

interface IProps {
  title: string;
  subTitle: string;
  FeaturedCities?: any;
  citiesTotalCount: number;
  slug?: string;
}
const OurCities = ({
  title,
  subTitle,
  FeaturedCities,
  citiesTotalCount
}: IProps) => {
  return (
    <section className="Our_Cities-wrapper mt-10 bg-slate-200">
      <div className="cities flex gap-10 px-20 py-20">
        <div>
          <h1 className="text-4xl font-bold">{title}</h1>
          <p className="text-2xl">{subTitle}</p>
        </div>
        <CitiesSwiperDesk data={FeaturedCities} />
      </div>
    </section>
  );
};

export default OurCities;
