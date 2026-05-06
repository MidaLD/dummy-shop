import RatingStars from "../../ui/RatingStars";

type Review = {
  comment: string;
  date: string;
  rating: number;
  reviewerEmail: string;
  reviewerName: string;
};

type ReviewParams = {
  review: Review;
};

function Review({ review }: ReviewParams) {
  const { rating, comment, date, reviewerName } = review;

  const formattedDate = new Date(date);

  return (
    <div className="review-box">
      <div className="rating-date">
        <RatingStars rating={rating} ratingNum={false} />
        <span>{formattedDate.toLocaleDateString()}</span>
      </div>
      <p className="comment">{comment}</p>
      <p className="reviewer-name">{reviewerName}</p>
    </div>
  );
}

export default Review;
