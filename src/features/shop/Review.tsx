import dayjs from "dayjs";
import RatingStars from "../../ui/RatingStars";
import { memo } from "react";

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

const Review = memo(function Review({ review }: ReviewParams) {
  const { rating, comment, date, reviewerName } = review;

  const formattedDate = dayjs(date).format("MMM D, YYYY");

  const initials = reviewerName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
            {initials}
          </div>
          <div>
            <p className="text-sm font-medium leading-tight text-slate-800">
              {reviewerName}
            </p>
            <p className="text-xs text-slate-400">{formattedDate}</p>
          </div>
        </div>
        <RatingStars rating={rating} ratingNum={false} />
      </div>

      <p className="text-sm leading-relaxed text-slate-600">{comment}</p>
    </div>
  );
});

export default Review;
