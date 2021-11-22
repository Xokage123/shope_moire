export interface IBasketStore {
  id: number;
  items: Array<unknown>;
  user: {
    id: number;
    accessKey: string;
  };
}
