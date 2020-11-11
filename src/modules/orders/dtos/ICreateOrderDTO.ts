export default interface ICreateOrderDTO {
  delivery_name: string;
  delivery_mobile: string;
  is_order_delivering: number;
  delivery_address1: string | undefined;
  delivery_address2: string | undefined;
  delivery_city?: string;
  delivery_state?: string;
  delivery_zip_code?: string;
  delivery_date: Date;
  delivery_time: string;
  order_total: number;
  is_delivered: number;
}
