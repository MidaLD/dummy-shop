import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

type RatingStartProps = {
  rating: number;
  ratingNum?: boolean;
};

function RatingStars({ rating, ratingNum = true }: RatingStartProps) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} color="#f5a623" />);
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} color="#f5a623" />);
    } else {
      stars.push(<FaRegStar key={i} color="#f5a623" />);
    }
  }

  return (
    <div className="rating">
      {ratingNum && <span className="rating-num">{rating}</span>}
      {stars}
    </div>
  );
}

export default RatingStars;
