import { Fragment, memo, useCallback} from 'react';

import RenderCard from '../../components/render-card/render-card.tsx';
import { Card } from '../../types/card.tsx';

import type { ReactElement } from 'react';

type OffersListProps = {
  offers: Card[];
  onActiveOfferChange?: (offerId: string | null) => void;
}

function OffersList({ offers, onActiveOfferChange }: OffersListProps): ReactElement {
  const handleHover = useCallback((offerId: string | null) => {
    if (onActiveOfferChange) {
      onActiveOfferChange(offerId);
    }
  }, [onActiveOfferChange]);

  return (
    <Fragment>
      {offers.map((card) => (
        <RenderCard key={card.id} {...card} onHover={handleHover} />
      ))}
    </Fragment>
  );
}

const MemoOffersList = memo(OffersList);

export default MemoOffersList;
