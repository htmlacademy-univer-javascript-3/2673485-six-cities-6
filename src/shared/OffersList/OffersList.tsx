import React from 'react';
import { Card } from '../../types/Card.tsx';
import RenderCard from '../../components/RenderCard/RenderCard.tsx';

type OffersListProps = {
  offers: Card[];
}

function OffersList({ offers }: OffersListProps): JSX.Element {
  const [, setActiveOfferId] = React.useState<number | null>(null);

  return (
    <React.Fragment>
      {offers.map((card) => (
        <RenderCard key={card.id} {...card} onHover={setActiveOfferId} />
      ))}
    </React.Fragment>
  );
}

export default OffersList;

