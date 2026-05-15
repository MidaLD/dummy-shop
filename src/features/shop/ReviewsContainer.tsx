import Review from "./Review";

type ReviewItem = {
  comment: string;
  date: string;
  rating: number;
  reviewerEmail: string;
  reviewerName: string;
};

type ReviewsContainerProps = {
  reviews: ReviewItem[];
};

function ReviewsContainer({ reviews }: ReviewsContainerProps) {
  if (reviews.length === 0)
    return (
      <div className="mt-10 flex items-center justify-center rounded-2xl border border-dashed border-slate-200 py-12">
        <p className="text-sm text-slate-400">No reviews yet.</p>
      </div>
    );

  return (
    <section className="mt-10">
      <div className="mb-6 flex items-baseline gap-2">
        <h2 className="text-xl font-semibold text-slate-800">Reviews</h2>
        <span className="text-sm text-slate-400">({reviews.length})</span>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review, i) => (
          <Review review={review} key={i} />
        ))}
      </div>
    </section>
  );
}

export default ReviewsContainer;
