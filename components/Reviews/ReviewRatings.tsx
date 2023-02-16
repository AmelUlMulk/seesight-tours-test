interface IProps {
  totalReviews: Record<string, any>;
}
const ReviewRatings = ({ totalReviews }: IProps) => {
  console.log('totalReviews:', totalReviews);
  return (
    <div>
      <div>Record Ratings Progress Bar</div>
    </div>
  );
};

export default ReviewRatings;
