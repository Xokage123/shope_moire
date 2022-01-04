<template>
  <div v-if="orderInfo" class="content__top">
    <ul class="breadcrumbs">
      <li class="breadcrumbs__item">
        <router-link
          class="breadcrumbs__link pointer"
          :to="{
            name: 'ProductsPage',
          }"
        >
          Каталог
        </router-link>
      </li>
      <li class="breadcrumbs__item">
        <router-link
          class="breadcrumbs__link pointer"
          :to="{
            name: 'BasketPage',
          }"
        >
          Корзина
        </router-link>
      </li>
      <li class="breadcrumbs__item">
        <a class="breadcrumbs__link"> Оформление заказа </a>
      </li>
    </ul>

    <h1 class="content__title">
      Заказ оформлен <span>№ {{ orderInfo.id }}</span>
    </h1>
  </div>

  <section v-if="orderInfo" class="cart">
    <form class="cart__form form" action="#" method="POST">
      <div class="cart__field">
        <p class="cart__message">
          Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет
          письмо с&nbsp;деталями заказа. Наши менеджеры свяжутся с&nbsp;Вами
          в&nbsp;течение часа для уточнения деталей доставки.
        </p>

        <ul class="dictionary">
          <li class="dictionary__item">
            <span class="dictionary__key"> Получатель </span>
            <span class="dictionary__value"> {{ orderInfo.name }} </span>
          </li>
          <li class="dictionary__item">
            <span class="dictionary__key"> Адрес доставки </span>
            <span class="dictionary__value">
              {{ orderInfo.address }}
            </span>
          </li>
          <li class="dictionary__item">
            <span class="dictionary__key"> Телефон </span>
            <span class="dictionary__value"> {{ orderInfo.phone }} </span>
          </li>
          <li class="dictionary__item">
            <span class="dictionary__key"> Email </span>
            <span class="dictionary__value"> {{ orderInfo.email }} </span>
          </li>
          <li class="dictionary__item">
            <span class="dictionary__key"> Способ оплаты </span>
            <span class="dictionary__value"> {{ orderInfo.paymentType }} </span>
          </li>
        </ul>
      </div>

      <div class="cart__block">
        <ul class="cart__orders">
          <li
            :key="product.id"
            v-for="product in orderInfo.basket.items"
            class="cart__order"
          >
            <h3>{{ product.product.title }} ({{ product.quantity }} шт.)</h3>
            <b>{{ product.quantity * product.product.price }} ₽</b>
            <span>Артикул: {{ product.id }}</span>
          </li>
        </ul>

        <div class="cart__total">
          <p>
            Доставка: <b>{{ orderInfo.deliveryType.price }} ₽</b>
          </p>
          <p>
            Итого: <b>{{ numberProductToOrder }}</b> товара на сумму
            <b>{{ orderInfo.totalPrice }} ₽</b>
          </p>
        </div>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import helperBasket from "@/helpers/basket";

import type { IRootStore } from "@/store/types";

export default defineComponent({
  setup: () => {
    const $store = useStore<IRootStore>();
    const $router = useRouter();

    const { numberProductToOrder } = helperBasket();

    const orderInfo = ref($store.state.basket.order);

    if (!orderInfo.value) {
      $router.push({
        name: "ProductsPage",
      });
    }

    return {
      orderInfo,
      numberProductToOrder,
    };
  },
});
</script>
