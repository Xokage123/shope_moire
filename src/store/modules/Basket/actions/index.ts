import { ActionTree } from "vuex";
// API
import {
  getBasketUser,
  addProductToBasket,
  toggleProductToBasket,
  removeProductFromBasket,
} from "@/api/index";
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
  async fetchToggleAmount(
    context,
    {
      token,
      information,
    }: {
      token: string;
      information: {
        basketItemId: string;
        quantity: string;
      };
    }
  ) {
    const basket = await toggleProductToBasket(token, information);
    context.rootState.basket = basket;
    return basket;
  },
  async fetchRemoveProduct(
    context,
    {
      token,
      id,
    }: {
      token: string;
      id: string;
    }
  ) {
    const basket = await removeProductFromBasket(token, id);
    context.rootState.basket = basket;
    return basket;
  },
};

export default actionsBasket;
