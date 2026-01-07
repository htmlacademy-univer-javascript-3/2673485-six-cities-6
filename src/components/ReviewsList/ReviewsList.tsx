import {Fragment, memo} from 'react';

import { Reviews } from '../../types/Review.tsx';
import Review from '../Review/Review.tsx';

import type { ReactElement } from 'react';

type ReviewsListProps = {
  reviews: Reviews;
};

function ReviewsList({ reviews }: ReviewsListProps): ReactElement {
  return (
    <Fragment>
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews.map((review) => (
          <Review key={review.id} review={review} />
        ))}
      </ul>
    </Fragment>
  );
}
const MemoReviewsList = memo(ReviewsList);

export default MemoReviewsList;
