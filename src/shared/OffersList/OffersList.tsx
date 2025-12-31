import React from 'react';
import { Card } from '../../types/Card.tsx';
import RenderCard from '../../components/RenderCard/RenderCard.tsx';

type OffersListProps = {
  offers: Card[];
  onActiveOfferChange?: (offerId: string | null) => void;
}

function OffersList({ offers, onActiveOfferChange }: OffersListProps): JSX.Element {
  const [, setActiveOfferId] = React.useState<string | null>(null);

  const handleHover = (offerId: string | null) => {
    setActiveOfferId(offerId);
    if (onActiveOfferChange) {
      onActiveOfferChange(offerId);
    }
  };

  return (
    <React.Fragment>
      {offers.map((card) => (
        <RenderCard key={card.id} {...card} onHover={handleHover} />
      ))}
    </React.Fragment>
  );
}

export default OffersList;

