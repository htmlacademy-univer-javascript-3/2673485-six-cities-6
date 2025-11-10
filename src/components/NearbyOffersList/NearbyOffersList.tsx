import { Card } from '../../types/Card.tsx';
import RenderCard from '../RenderCard/RenderCard.tsx';

type NearbyOffersListProps = {
  offers: Card[];
};

function NearbyOffersList({ offers }: NearbyOffersListProps): JSX.Element {
  return (
    <>
      {offers.map((card) => (
        <RenderCard
          key={card.id}
          {...card}
          cardClassName="near-places__card place-card"
          imageWrapperClassName="near-places__image-wrapper place-card__image-wrapper"
        />
      ))}
    </>
  );
}

export default NearbyOffersList;

