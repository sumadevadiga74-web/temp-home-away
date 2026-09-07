'use client';

import {
  MapContainer,
  TileLayer,
  Marker,
  ZoomControl,
} from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import { icon } from 'leaflet';

import { findCountryByCode } from '@/utils/countries';
import CountryFlagAndName from '../card/CountryFlagAndName';
import Title from './Title';

const iconUrl =
  'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png';

const markerIcon = icon({
  iconUrl,
  iconSize: [20, 30],
});
function PropertyMap({
  countryCode,
}: {
  countryCode: string;
}) {
  const defaultLocation: [number, number] = [
    51.505,
    -0.09,
  ];

  const country = findCountryByCode(countryCode);

  const location: [number, number] =
    country?.latlng && country.latlng.length === 2
      ? [country.latlng[0], country.latlng[1]]
      : defaultLocation;

  return (
    <div className='mt-4'>
      <div className='mb-4'>
        <Title text='Where you will be staying' />
        <CountryFlagAndName countryCode={countryCode} />
      </div>

      <MapContainer
        scrollWheelZoom={false}
        zoomControl={false}
        className='h-[50vh] rounded-lg relative z-0'
        center={location}
        zoom={7}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        <ZoomControl position='bottomright' />

        <Marker
          position={location}
          icon={markerIcon}
        />
      </MapContainer>
    </div>
  );
}

export default PropertyMap;