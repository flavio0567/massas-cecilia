export default interface ICreateUserDTO {
  avatar: string;
  name: string;
  email?: string;
  mobile: string;
  password_hash: string;
  is_admin: number;
  is_active: number;
}
