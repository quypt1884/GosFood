export interface IOrder {
  id: number;
  userId?: number;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  dateOrder?: string;
  orderDetail: 
    {
      id: number;
      quantity: number;
      note?: string;
      isReview: boolean
    }[]
  ;
  status: "Placed" | "Processing" |"Shipping"|"Completed"|"Cancelled"
  totalMoney: number;
}
