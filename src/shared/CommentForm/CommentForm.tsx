import {Fragment, useState} from 'react';

import type { ReactElement } from 'react';

type CommentFormProps = {
  onSubmit: (payload: {comment: string; rating: number}) => void;
  isSending?: boolean;
};

function CommentForm({onSubmit, isSending = false}: CommentFormProps): ReactElement {
  const [rating, setRating] = useState<number | null>(null);
  const [review, setReview] = useState('');

  const isSubmitDisabled = isSending || !rating || review.trim().length < 50;

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={(event) => {
        event.preventDefault();
        if (!rating || review.trim().length < 50) {
          return;
        }

        onSubmit({comment: review.trim(), rating});
        setRating(null);
        setReview('');
      }}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {[5,4,3,2,1].map((value) => (
          <Fragment key={value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={`${value}-stars`}
              type="radio"
              checked={rating === value}
              onChange={() => setRating(value)}
              disabled={isSending}
            />
            <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title="rating">
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        disabled={isSending}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isSubmitDisabled}>Submit</button>
      </div>
    </form>
  );
}

export default CommentForm;
