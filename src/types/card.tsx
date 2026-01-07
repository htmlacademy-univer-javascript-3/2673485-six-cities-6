export type Card = {
  id: string;
  isPremium : boolean;
  imageLink : string;
  price : number;
  inBookMarks : boolean;
  rating : number;
  description : string;
  accommodationType : string;
  city: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}
