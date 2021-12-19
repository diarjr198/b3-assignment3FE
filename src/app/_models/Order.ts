import { Product } from './Product';
import { User } from './User';

export class Order {
  _id?: string;
  product?: Product;
  user?: User;
  amount?: number;
  total?: number;
  nameReceive?: string;
  address?: string;
  status?: string;
}
