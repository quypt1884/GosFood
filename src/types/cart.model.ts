export interface ICart {
  id: number;
  quantity: number;
  note?: string;
  price: number;
  name: string;
  thumbnail?: string;
  size: string;
  decription?: string;
  discount?: number;
  newPrice: number;
  isStock: boolean;
}
