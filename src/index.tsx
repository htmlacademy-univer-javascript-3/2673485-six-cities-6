import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import {Card} from './types/Card.tsx';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const cards : Card[] = [
  {
    isPremium : true,
    imageLink : 'img/apartment-01.jpg',
    price : 120,
    inBookMarks : false,
    rating : 80,
    description : 'Beautiful &amp; luxurious apartment at great location',
    accommodationType : 'Apartment'
  },
  {
    isPremium : false,
    imageLink : 'img/room.jpg',
    price : 80,
    inBookMarks : true,
    rating : 80,
    description : 'Wood and stone place',
    accommodationType : 'Room'
  },
  {
    isPremium : false,
    imageLink : 'img/apartment-02.jpg',
    price : 132,
    inBookMarks : false,
    rating : 80,
    description : 'Canal View Prinsengracht',
    accommodationType : 'Apartment'
  },
  {
    isPremium : true,
    imageLink : 'img/apartment-03.jpg',
    price : 180,
    inBookMarks : false,
    rating : 100,
    description : 'Nice, cozy, warm big bed apartment',
    accommodationType : 'Apartment'
  },
  {
    isPremium : false,
    imageLink : 'img/room.jpg',
    price : 80,
    inBookMarks : true,
    rating : 80,
    description : 'Wood and stone place',
    accommodationType : 'Room'
  }
];

root.render(
  <React.StrictMode>
    <App availableCards={cards} />
  </React.StrictMode>,
);
