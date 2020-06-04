export default interface ICreateProductDTO {
  code: string;
  name: string;
  barcode: number;
  unit: string;
  sales_price: number;
  ncm: number;
  is_active: number;
}
