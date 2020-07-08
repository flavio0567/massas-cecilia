export default interface ICreateOrderDTO {
  user_id: string;
  delivery_type: string;
  delivery_date: Date;
  price: number;
}
