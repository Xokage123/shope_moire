// Modules
import type { IFilterStore } from "./modules/Filters/types";
import type { IProductsStore } from "./modules/Products/types";

export interface IRootStore {
  filters: IFilterStore;
  products: IProductsStore;
}
