import {memo} from 'react';

import { Card } from '../../types/Card.tsx';
import RenderCard from '../RenderCard/RenderCard.tsx';

import type { ReactElement } from 'react';

type NearbyOffersListProps = {
  offers: Card[];
};

function NearbyOffersList({ offers }: NearbyOffersListProps): ReactElement {
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

const MemoNearbyOffersList = memo(NearbyOffersList);

export default MemoNearbyOffersList;
