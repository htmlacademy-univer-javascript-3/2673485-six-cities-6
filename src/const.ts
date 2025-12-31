import {Icon} from 'leaflet';
import {City} from './types/types.ts';

export const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;

export const CITY_COORDINATES: Record<string, City> = {
  Paris: {lat: 48.85661, lng: 2.351499, zoom: 12},
  Cologne: {lat: 50.938361, lng: 6.959974, zoom: 12},
  Brussels: {lat: 50.846557, lng: 4.351697, zoom: 12},
  Amsterdam: {lat: 52.37454, lng: 4.897976, zoom: 12},
  Hamburg: {lat: 53.550341, lng: 10.000654, zoom: 12},
  Dusseldorf: {lat: 51.225402, lng: 6.776314, zoom: 12}
};

export const URL_MARKER_DEFAULT = '/img/pin.svg';

export const URL_MARKER_CURRENT = '/img/pin-active.svg';

export const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39]
});

export const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39]
});

