export default interface IStorageProvider {
  savefile(file: string): Promise<string>;
  deletefile(file: string): Promise<void>;
}
