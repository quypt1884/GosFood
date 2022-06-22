export interface IProduct {
  id: number;
  categoryId: number;
  name: string;
  thumbnail?: string;
  price: number;
  size: string;
  decription?: string;
  discount?: number;
  newPrice?: number;
  isStock: boolean;
}
