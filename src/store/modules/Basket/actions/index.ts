import { ActionTree } from "vuex";
// API
import { getBasketUser, addProductToBasket } from "@/api/index";
// Types
import type { IBasketStore } from "../types";
import type { IRootStore } from "@/store/types";
import { IProductInBasket } from "@/ITE/interface/product";

const actionsBasket: ActionTree<IBasketStore, IRootStore> = {
  async fetchGetBasket(context, token?: string) {
    const basket: IBasketStore = await getBasketUser(token);
    context.rootState.basket = basket;
    return basket;
  },
  async fetchAddProductInBasket(
    context,
    {
      information,
      token,
    }: {
      information: IProductInBasket;
      token: string;
    }
  ) {
    if (token) {
      const basket = await addProductToBasket(token, information);
      context.rootState.basket = basket;
      return basket;
    }
  },
};

export default actionsBasket;
