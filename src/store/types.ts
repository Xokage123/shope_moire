// Modules
import type { IFilterStore } from "./modules/Filters/types";
import type { IProductsStore } from "./modules/Products/types";
import type { IUserStore } from "./modules/User/types";
import type { IBasketStore } from "./modules/Basket/types";

export interface IRootStore {
  filters: IFilterStore;
  products: IProductsStore;
  user: IUserStore;
  basket: IBasketStore;
}
