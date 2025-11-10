import { Card } from '../types/Card.tsx';

// Предложения неподалеку от первого предложения (id: 1)
export const nearbyOffers: Card[] = [
  {
    id: 2,
    isPremium: false,
    imageLink: 'img/room.jpg',
    price: 80,
    inBookMarks: true,
    rating: 80,
    description: 'Wood and stone place',
    accommodationType: 'Room',
    city: 'Amsterdam',
    coordinates: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198
    }
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
    city: 'Amsterdam',
    coordinates: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198
    }
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
    city: 'Amsterdam',
    coordinates: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198
    }
  }
];

export default nearbyOffers;

