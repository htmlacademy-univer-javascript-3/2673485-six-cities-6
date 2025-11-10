import { Card } from '../types/Card.tsx';

export const offers: Card[] = [
  {
    id: 1,
    isPremium: true,
    imageLink: 'img/apartment-01.jpg',
    price: 120,
    inBookMarks: false,
    rating: 80,
    description: 'Beautiful & luxurious apartment at great location',
    accommodationType: 'Apartment',
    city: 'Amsterdam'
  },
  {
    id: 2,
    isPremium: false,
    imageLink: 'img/room.jpg',
    price: 80,
    inBookMarks: true,
    rating: 80,
    description: 'Wood and stone place',
    accommodationType: 'Room',
    city: 'Amsterdam'
  },
  {
    id: 3,
    isPremium: false,
    imageLink: 'img/apartment-02.jpg',
    price: 132,
    inBookMarks: false,
    rating: 80,
    description: 'Canal View Prinsengracht',
    accommodationType: 'Apartment',
    city: 'Cologne'
  },
  {
    id: 4,
    isPremium: true,
    imageLink: 'img/apartment-03.jpg',
    price: 180,
    inBookMarks: false,
    rating: 100,
    description: 'Nice, cozy, warm big bed apartment',
    accommodationType: 'Apartment',
    city: 'Cologne'
  }
];

export default offers;

