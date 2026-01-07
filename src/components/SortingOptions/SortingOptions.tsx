import type { ReactElement } from 'react';

export type SortType = 'Popular' | 'Price: low to high' | 'Price: high to low' | 'Top rated first';

type SortingOptionsProps = {
  value: SortType;
  onChange: (next: SortType) => void;
};

const SORT_ITEMS: SortType[] = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first'
];

function SortingOptions({value, onChange}: SortingOptionsProps): ReactElement {
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        {value}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className="places__options places__options--custom places__options--opened">
        {SORT_ITEMS.map((item) => (
          <li
            key={item}
            className={`places__option${item === value ? ' places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => onChange(item)}
            onKeyDown={(evt) => {
              if (evt.key === 'Enter') {
                onChange(item);
              }
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default SortingOptions;
