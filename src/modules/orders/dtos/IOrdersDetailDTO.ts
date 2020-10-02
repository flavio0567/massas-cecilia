export default interface IOrdersDetailDTO {
  delivery_name: string;
  delivery_mobile: string;
  is_order_delivering: number;
  delivery_address1: string | null | undefined;
  delivery_address2: string | null | undefined;
  delivery_city: string | null | undefined;
  delivery_state: string | null | undefined;
  delivery_zip_code?: string | null;
  delivery_date: Date;
  delivery_time: string;
  order_total: number;
  order_details: [
    {
      order_id: string;
      product_id: string;
      sales_price: number;
      unit: string;
      amount: number;
      quantity: number;
    }
  ];
}
