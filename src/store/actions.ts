import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {Card} from '../types/Card.tsx';
import {AxiosInstance} from 'axios';

type ServerOffer = {
	id: string;
	title: string;
	type: string;
	price: number;
	rating: number;
	city: {
		name: string;
		location: {
			latitude: number;
			longitude: number;
			zoom: number;
		};
	};
	location: {
		latitude: number;
		longitude: number;
		zoom: number;
	};
	isFavorite: boolean;
	isPremium: boolean;
	previewImage: string;
};

function adaptOfferToClient(offer: ServerOffer): Card {
  return {
    id: offer.id,
    isPremium: offer.isPremium,
    imageLink: offer.previewImage,
    price: offer.price,
    inBookMarks: offer.isFavorite,
    rating: Math.round(offer.rating * 20),
    description: offer.title,
    accommodationType: offer.type,
    city: offer.city.name,
    coordinates: {
      latitude: offer.location.latitude,
      longitude: offer.location.longitude
    }
  };
}

export const changeCity = createAction<string>('offers/changeCity');

export const fetchOffers = createAsyncThunk<Card[], undefined, {extra: AxiosInstance}>(
  'offers/fetchOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<ServerOffer[]>('/offers');
    return data.map(adaptOfferToClient);
  }
);
