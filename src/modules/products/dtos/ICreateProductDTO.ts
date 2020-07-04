export default interface ICreateProductDTO {
  code: string;
  name: string;
  barcode: number;
  unit: string;
  sales_price: number;
  ncm: number;
  amount: number;
  is_inactive: number;
  product_family: number;
  category: number;
  sub_category: number;
}
