import { memo, useEffect, useRef } from 'react';
import type { ReactElement } from 'react';

import { Marker, layerGroup } from 'leaflet';

import { currentCustomIcon, defaultCustomIcon } from '../../const.ts';
import useMap from '../../hooks/use-map';
import 'leaflet/dist/leaflet.css';
import { MapProps } from '../../types/map-entities.ts';

function Map(props: MapProps): ReactElement {
  const {city, pointsCheck, selectedPoint, mapClassName = 'cities__map map'} = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      map.setView({lat: city.lat, lng: city.lng}, city.zoom);
    }
  }, [map, city]);

  useEffect(() => {
    if (map) {
      const markerLayerCheck = layerGroup().addTo(map);
      pointsCheck.forEach((point) => {
        const marker = new Marker({
          lat: point.lat,
          lng: point.lng
        });

        marker
          .setIcon(
            selectedPoint !== undefined && point.id === selectedPoint.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayerCheck);
      });

      return () => {
        map.removeLayer(markerLayerCheck);
      };
    }
  }, [map, pointsCheck, selectedPoint]);

  return <div style={{height: '100%', width: '100%'}} ref={mapRef} className={mapClassName || ''}></div>;
}

const MemoMap = memo(Map);

export default MemoMap;
