import { Card } from '../../types/Card.tsx';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../types/RouteTypes.tsx';

type RenderCardProps = Card & {
  onHover?: (id: number | null) => void;
  cardClassName?: string;
  imageWrapperClassName?: string;
};

export function RenderCard({id, isPremium, imageLink, price, inBookMarks, rating, description, accommodationType, onHover, cardClassName = 'cities__card place-card', imageWrapperClassName = 'cities__image-wrapper place-card__image-wrapper'} : RenderCardProps): JSX.Element {
  return (
    <article className={cardClassName} onMouseEnter={() => onHover && onHover(id)} onMouseLeave={() => onHover && onHover(null)}>
      {
        isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div className={imageWrapperClassName}>
        <Link to={`${AppRoute.OfferBase}/${id}`}>
          <img className="place-card__image" src={imageLink} width={260} height={200} alt="Place image" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <
            button className={`place-card__bookmark-button button ${
              inBookMarks && 'place-card__bookmark-button--active'} button`}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{inBookMarks && 'In bookmarks' || !inBookMarks && 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${rating}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.OfferBase}/${id}`}>{description}</Link>
        </h2>
        <p className="place-card__type">{accommodationType}</p>
      </div>
    </article>
  );
}

export default RenderCard;
