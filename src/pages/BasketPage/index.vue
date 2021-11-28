<template>
  <div class="content__top">
    <ul class="breadcrumbs">
      <li class="breadcrumbs__item">
        <router-link
          :to="{
            name: 'ProductsPage',
          }"
        >
          Каталог
        </router-link>
      </li>
      <li class="breadcrumbs__item">
        <a class="breadcrumbs__link"> Корзина </a>
      </li>
    </ul>

    <div class="content__row">
      <h1 class="content__title">Корзина</h1>
      <span class="content__info"> {{ numberProductToBasket }} товара</span>
    </div>
  </div>

  <section class="cart">
    <form @submit.prevent="goToCheckoutPage" class="cart__form form">
      <div class="cart__field">
        <ul class="cart__list">
          <li
            :key="product.id"
            v-for="product in productsBasket"
            class="cart__item product"
          >
            <div class="product__pic">
              <img
                :src="product.product.colors[0].gallery[0].file.url"
                width="120"
                height="120"
                alt="Название товара"
              />
            </div>
            <h3 class="product__title">{{ product.product.title }}</h3>
            <p class="product__info product__info--color">
              Цвет:
              <span>
                <i style="background-color: #ff9b78"></i>
                Персиковый
              </span>
            </p>
            <span class="product__code"> Артикул: {{ product.id }} </span>

            <div class="product__counter form__counter">
              <button
                @click="
                  toggleProductInBasket(
                    product.id,
                    product.quantity > 0
                      ? product.quantity - 1
                      : product.quantity
                  )
                "
                type="button"
                aria-label="Убрать один товар"
              >
                <svg
                  width="9"
                  height="3"
                  viewBox="0 0 9 3"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.287 2.574H0.7V0.765H8.287V2.574Z"
                    fill="#9D9D9D"
                  />
                </svg>
              </button>

              <input type="text" v-model="product.quantity" name="count" />

              <button
                @click="toggleProductInBasket(product.id, product.quantity + 1)"
                type="button"
                aria-label="Добавить один товар"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.524 11.086H5.094V6.576H0.54V5.102H5.094V0.57H6.524V5.102H11.078V6.576H6.524V11.086Z"
                    fill="#9D9D9D"
                  />
                </svg>
              </button>
            </div>

            <b class="product__price">
              {{ product.quantity * product.price }} ₽
            </b>

            <button
              @click="removeProductInBasket(product.id)"
              class="product__del button-del"
              type="button"
              aria-label="Удалить товар из корзины"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17 1L1 17" stroke="#9D9D9D" stroke-width="0.8" />
                <path
                  d="M17 17L1 0.999999"
                  stroke="#9D9D9D"
                  stroke-width="0.8"
                />
              </svg>
            </button>
          </li>
        </ul>
      </div>

      <div class="cart__block">
        <p class="cart__desc">
          Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
        </p>
        <p class="cart__price">
          Итого: <span>{{ totalPrice }} ₽</span>
        </p>

        <button
          :disabled="!numberProductToBasket"
          class="cart__button button button--primery"
          type="submit"
        >
          Оформить заказ
        </button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import type { IRootStore } from "@/store/types";

import helperBasket from "@/helpers/basket";

export default defineComponent({
  setup: () => {
    const $store = useStore<IRootStore>();
    const $router = useRouter();

    const productsBasket = ref($store.state.basket.items);

    const { numberProductToBasket, totalPrice } = helperBasket();

    const goToCheckoutPage = () => {
      $router.push({
        name: "CheckoutOrderPage",
      });
    };

    const toggleProductInBasket = (id: number, quantity: number) => {
      if (quantity) {
        $store.dispatch("basket/fetchToggleAmount", {
          token: localStorage.getItem("user_token"),
          information: {
            basketItemId: id,
            quantity,
          },
        });
      }
    };

    const removeProductInBasket = (id: string) => {
      $store.dispatch("basket/fetchRemoveProduct", {
        token: localStorage.getItem("user_token"),
        id,
      });
    };

    watch(
      () => $store.state.basket.items,
      (newValue) => {
        productsBasket.value = newValue;
      }
    );

    return {
      productsBasket,
      toggleProductInBasket,
      removeProductInBasket,

      numberProductToBasket,
      totalPrice,

      goToCheckoutPage,
    };
  },
});
</script>
