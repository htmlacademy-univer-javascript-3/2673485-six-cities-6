import {createAction} from '@reduxjs/toolkit';
import {Card} from '../types/Card.tsx';

export const changeCity = createAction<string>('offers/changeCity');

export const loadOffers = createAction<Card[]>('offers/loadOffers');
