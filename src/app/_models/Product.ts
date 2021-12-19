import { Review } from './Review';

export class Product {
  _id?: string;
  title?: string;
  description?: string;
  imagePath?: string;
  stock?: number;
  price?: number;
  weight?: number;
  rating?: number;
  category?: { id?: string; category?: string };
  courier?: { id?: string; courier?: string };
  review?: Array<Review>;
}
