import type { ReactElement } from 'react';

import { CITIES } from '../../const.ts';

type CitiesListProps = {
  currentCity: string;
  onCityChange: (city: string) => void;
};

function CitiesList({currentCity, onCityChange}: CitiesListProps): ReactElement {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CITIES.map((city) => {
            const isActive = city === currentCity;
            return (
              <li key={city} className="locations__item">
                <a
                  className={`locations__item-link tabs__item${isActive ? ' tabs__item--active' : ''}`}
                  href="#"
                  onClick={(evt) => {
                    evt.preventDefault();
                    onCityChange(city);
                  }}
                >
                  <span>{city}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export default CitiesList;
