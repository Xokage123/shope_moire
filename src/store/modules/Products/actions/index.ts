import { ActionTree } from "vuex";
// API
import { getProductsList } from "@/api/index";
// Types
import type { IProductsStore } from "../types";
import type { IProductsListProps } from "@/ITE/interface/product";
import type { IRootStore } from "@/store/types";

interface ILoadListProductProps {
  numberPage: number;
  filtersObject: IProductsListProps;
}

const actionsProducts: ActionTree<IProductsStore, IRootStore> = {
  async loadListProduct(
    { state },
    { numberPage, filtersObject }: ILoadListProductProps
  ) {
    const informationProducts = await getProductsList(
      numberPage,
      filtersObject
    );

    state.listProducts = informationProducts.items;
    state.totalNumberPage = informationProducts.pagination.pages;
    state.actualNumberPage = informationProducts.pagination.page;
    state.totalProducts = informationProducts.pagination.total;

    return informationProducts;
  },
};

export default actionsProducts;
