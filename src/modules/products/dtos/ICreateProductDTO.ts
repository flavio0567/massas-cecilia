export default interface ICreateProductDTO {
  code: string;
  name: string;
  barcode: number;
  unit: string;
  amount: number;
  sales_price: number;
  ncm: number;
  is_inactive: number;
  exception: number;
  product_family: number;
  category: number;
  sub_category: number;
}
