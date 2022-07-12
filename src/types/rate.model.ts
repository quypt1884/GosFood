export interface IRate {
  id: number;
  userId?: number;
  firstName?: string;
  lastName?: string;
  phone?: string;
  foodId: number;
  point: number;
  review: string;
  isAnonymous: boolean;
  dateRate?: string;
}
