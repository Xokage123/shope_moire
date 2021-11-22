import { ActionTree } from "vuex";
// API
import { getBasketUser } from "@/api/index";
// Types
import type { IBasketStore } from "../types";
import type { IRootStore } from "@/store/types";

const actionsBasket: ActionTree<IBasketStore, IRootStore> = {
  async fetchGetBasket(context, token?: string) {
    const basket: IBasketStore = await getBasketUser(token);
    context.state = basket;
    return basket;
  },
};

export default actionsBasket;
