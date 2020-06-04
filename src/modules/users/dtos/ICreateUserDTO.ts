export default interface ICreateUserDTO {
  avatar: string;
  name: string;
  email: string;
  mobile: number;
  password_hash: string;
  is_admin: number;
  is_active: number;
}
