import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { AuthorizationStatus } from '../../const.ts';
import { saveToken } from '../../services/token.ts';
import { Card } from '../../types/card.tsx';
import { Review } from '../../types/review.tsx';

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

type ServerReview = {
  id: string;
  date: string;
  comment: string;
  rating: number;
  user: {
    name: string;
    avatarUrl: string;
  };
};

type PostReviewPayload = {
  offerId: string;
  comment: string;
  rating: number;
};

type ThunkConfig = {
  extra: AxiosInstance;
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

function adaptReviewToClient(review: ServerReview): Review {
  return {
    id: review.id,
    user: review.user,
    rating: Math.round(review.rating * 20),
    comment: review.comment,
    date: review.date
  };
}

export const changeCity = createAction<string>('offers/changeCity');
export const setAuthStatus = createAction<AuthorizationStatus>('user/setAuthStatus');
export const setUser = createAction<AuthInfo | null>('user/setUser');
export const logout = createAction('user/logout');

export const fetchOffers = createAsyncThunk<Card[], undefined, ThunkConfig>(
  'offers/fetchOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<ServerOffer[]>('/offers');
    return data.map(adaptOfferToClient);
  }
);

export const checkAuth = createAsyncThunk<AuthInfo, undefined, ThunkConfig>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<AuthInfo>('/login');
    saveToken(data.token);
    return data;
  }
);

export const login = createAsyncThunk<AuthInfo, LoginPayload, ThunkConfig>(
  'user/login',
  async (body, {extra: api}) => {
    const {data} = await api.post<AuthInfo>('/login', body);
    saveToken(data.token);
    return data;
  }
);

export const fetchOffer = createAsyncThunk<Card, string, ThunkConfig>(
  'offer/fetchOffer',
  async (id, {extra: api}) => {
    const {data} = await api.get<ServerOffer>(`/offers/${id}`);
    return adaptOfferToClient(data);
  }
);

export const fetchNearby = createAsyncThunk<Card[], string, ThunkConfig>(
  'offer/fetchNearby',
  async (id, {extra: api}) => {
    const {data} = await api.get<ServerOffer[]>(`/offers/${id}/nearby`);
    return data.map(adaptOfferToClient);
  }
);

export const fetchReviews = createAsyncThunk<Review[], string, ThunkConfig>(
  'offer/fetchReviews',
  async (id, {extra: api}) => {
    const {data} = await api.get<ServerReview[]>(`/comments/${id}`);
    return data.map(adaptReviewToClient);
  }
);

export const postReview = createAsyncThunk<Review, PostReviewPayload, ThunkConfig>(
  'offer/postReview',
  async ({offerId, comment, rating}, {extra: api}) => {
    const {data} = await api.post<ServerReview>(`/comments/${offerId}`, {comment, rating});
    return adaptReviewToClient(data);
  }
);
