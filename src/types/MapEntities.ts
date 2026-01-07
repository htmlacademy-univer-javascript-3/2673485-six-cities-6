import {City, Point, Points} from './types.ts';

export type MapProps = {
  city: City;
  pointsCheck: Points;
  selectedPoint: Point | undefined;
  mapClassName?: string;
};
