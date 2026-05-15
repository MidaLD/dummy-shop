import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

type RatingStartProps = {
  rating: number;
  ratingNum?: boolean;
};

function RatingStars({ rating, ratingNum = true }: RatingStartProps) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} color="#fbbf24" />);
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} color="#fbbf24" />);
    } else {
      stars.push(<FaRegStar key={i} color="#fbbf24" />);
    }
  }

  return (
    <div className="flex items-center gap-0.5 text-sm">
      {ratingNum && (
        <span className="mr-1 text-xs text-slate-500">
          {rating.toFixed(1)}
        </span>
      )}
      {stars}
    </div>
  );
}

export default RatingStars;
