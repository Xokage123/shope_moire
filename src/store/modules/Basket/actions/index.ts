import { ActionTree } from "vuex";

import {
  getBasketUser,
  addProductToBasket,
  toggleProductToBasket,
  removeProductFromBasket,
  getDeliveries,
  getPayments,
  getOrder,
  postOrder,
} from "@/api/index";

import type { IBasketStore, IOrderInformation } from "../types";
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
  async fetchAddDeliveries(context) {
    const listDeliveries = await getDeliveries();
    context.rootState.basket.deliveries = listDeliveries;
    return listDeliveries;
  },
  async fetchAddPayment(context, id: number) {
    const listPayment = await getPayments(id);
    context.rootState.basket.payments = listPayment;
    return listPayment;
  },
  async fetchPostOrder(
    { rootState },
    {
      token,
      information,
    }: {
      token: string;
      information: IOrderInformation;
    }
  ) {
    const orderInfo = await postOrder(token, information);
    const basket: IBasketStore = await getBasketUser(token);
    rootState.basket = basket;
    rootState.basket.order = orderInfo;
    return orderInfo;
  },
  async fetchGetOrder(
    context,
    {
      token,
      orderId,
    }: {
      token: string;
      orderId: string;
    }
  ) {
    const orderInfo = await getOrder(token, orderId);
    context.rootState.basket.order = orderInfo;
    return orderInfo;
  },
};

export default actionsBasket;
