export default interface ICacheProvider {
  save(ke: string, value: string): Promise<void>;
  recover(key: string): Promise<void>;
  invalidade(key: string): Promise<void>;
}
