export default interface IUpdateOrderDetailDTO {
  order_id: string;
  product_id: string;
  sales_price: number;
  unit: string;
  amount: number;
  quantity: number;
  product_name: string;
}
