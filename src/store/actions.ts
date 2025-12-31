import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {Card} from '../types/Card.tsx';
import {AxiosInstance} from 'axios';
import {AuthorizationStatus} from '../const.ts';
import {saveToken} from '../services/token.ts';

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

type AuthInfo = {
	token: string;
	email: string;
	name: string;
	avatarUrl: string;
	isPro: boolean;
};

type LoginPayload = {
	email: string;
	password: string;
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
export const setAuthStatus = createAction<AuthorizationStatus>('user/setAuthStatus');
export const setUser = createAction<AuthInfo | null>('user/setUser');
export const logout = createAction('user/logout');

export const fetchOffers = createAsyncThunk<Card[], undefined, {extra: AxiosInstance}>(
  'offers/fetchOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<ServerOffer[]>('/offers');
    return data.map(adaptOfferToClient);
  }
);

export const checkAuth = createAsyncThunk<AuthInfo, undefined, {extra: AxiosInstance}>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<AuthInfo>('/login');
    saveToken(data.token);
    return data;
  }
);

export const login = createAsyncThunk<AuthInfo, LoginPayload, {extra: AxiosInstance}>(
  'user/login',
  async (body, {extra: api}) => {
    const {data} = await api.post<AuthInfo>('/login', body);
    saveToken(data.token);
    return data;
  }
);
