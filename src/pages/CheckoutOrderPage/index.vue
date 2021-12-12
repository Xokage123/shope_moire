<template>
  <div class="content__top">
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

    <div class="content__row">
      <h1 class="content__title">Оформление заказа</h1>
    </div>
  </div>

  <section class="cart">
    <form class="cart__form form" @submit.prevent="checkoutBasketForm">
      <div class="cart__field">
        <div class="cart__data">
          <label class="form__label">
            <input
              v-model="initialUser"
              class="form__input"
              type="text"
              name="name"
              placeholder="Введите ваше полное имя"
            />
            <span class="form__value">ФИО</span>
          </label>

          <label class="form__label">
            <input
              v-model="addressUser"
              class="form__input"
              type="text"
              name="address"
              placeholder="Введите ваш адрес"
            />
            <span class="form__value">Адрес доставки</span>
          </label>

          <label class="form__label">
            <input
              v-model="phoneUser"
              @input="changePhone"
              class="form__input"
              type="tel"
              name="phone"
              placeholder="Введите ваш телефон"
            />
            <span class="form__value">Телефон</span>
            <span v-if="checkPhone" class="form__error">
              Неверный формат телефона
            </span>
          </label>

          <label class="form__label">
            <input
              v-model="emailUser"
              class="form__input"
              type="email"
              name="email"
              placeholder="Введи ваш Email"
            />
            <span class="form__value">Email</span>
          </label>

          <label class="form__label">
            <textarea
              v-model="messageUser"
              class="form__input form__input--area"
              name="comments"
              placeholder="Ваши пожелания"
            ></textarea>
            <span class="form__value">Комментарий к заказу</span>
          </label>
        </div>

        <div class="cart__options">
          <h3 class="cart__title">Доставка</h3>
          <ul class="cart__options options">
            <li
              :key="delivery.id"
              v-for="delivery in deliveries"
              class="options__item"
            >
              <label class="options__label">
                <input
                  class="options__radio sr-only"
                  type="radio"
                  @input="definePayment(delivery)"
                  name="delivery"
                  :value="delivery.id"
                />
                <span class="options__value">
                  {{ delivery.title }} <b>{{ delivery.price }} ₽</b>
                </span>
              </label>
            </li>
          </ul>

          <h3 class="cart__title">Оплата</h3>
          <ul class="cart__options options">
            <li
              :key="payment.id"
              v-for="payment in payments"
              class="options__item"
            >
              <label class="options__label">
                <input
                  class="options__radio sr-only"
                  @input="toggleActualPaymentId(payment.id)"
                  type="radio"
                  name="pay"
                  :value="payment.id"
                />
                <span class="options__value"> Картой при получении </span>
              </label>
            </li>
          </ul>
        </div>
      </div>

      <div class="cart__block">
        <ul class="cart__orders">
          <li
            :key="product.id"
            v-for="product in listProduct"
            class="cart__order"
          >
            <h3>{{ product.product.title }} ({{ product.quantity }} шт.)</h3>
            <b>{{ product.price * product.quantity }} ₽</b>
            <span>Артикул: {{ product.id }}</span>
          </li>
        </ul>

        <div v-if="actualDelivery" class="cart__total">
          <p>
            Доставка: <b>{{ actualDelivery.price }} ₽</b>
          </p>
          <p>
            Итого:
            <b>{{ numberProductToBasket }}</b> товара на сумму
            <b>{{ Number(totalPrice) + Number(actualDelivery.price) }} ₽</b>
          </p>
        </div>

        <button class="cart__button button button--primery" type="submit">
          Оформить заказ
        </button>
      </div>
      <div v-if="checkError" class="cart__error form__error-block">
        <h4>Заявка не отправлена!</h4>
        <p>
          Похоже произошла ошибка. Попробуйте отправить снова или перезагрузите
          страницу.
        </p>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import helperBasket from "@/helpers/basket";

import type { IRootStore } from "@/store/types";
import type {
  IDeliveries,
  IPayments,
  IOrderInformation,
} from "@/store/modules/Basket/types";

export default defineComponent({
  setup: () => {
    const $store = useStore<IRootStore>();
    const $router = useRouter();

    const { totalPrice, numberProductToBasket } = helperBasket();

    const listProduct = ref<unknown[]>($store.state.basket.items);

    const deliveries = ref<IDeliveries[]>($store.state.basket.deliveries);
    const actualDelivery = ref<IDeliveries | null>(null);
    const actualDeliveryId = ref<number>(0);

    const payments = ref<IPayments[]>($store.state.basket.payments);
    const actualPaymentId = ref<number>(0);
    const toggleActualPaymentId = (id: number) => {
      actualPaymentId.value = id;
    };
    const definePayment = (delivery: IDeliveries) => {
      actualDeliveryId.value = delivery.id;
      actualDelivery.value = delivery;
      $store
        .dispatch("basket/fetchAddPayment", delivery.id)
        .then((listPayment) => {
          payments.value = listPayment;
        });
    };

    const initialUser = ref<string>("");
    const addressUser = ref<string>("");
    const phoneUser = ref<string>("");
    const checkPhone = ref<boolean>(false);
    const emailUser = ref<string>("");
    const messageUser = ref<string>("");

    const changePhone = (ev: any) => {
      const value = ev.target.value as string;
      if (value.length === 1) {
        checkPhone.value = value.startsWith("+") ? false : true;
      } else {
        checkPhone.value =
          value.startsWith("+") &&
          Number(value.slice(1)) &&
          value !== "" &&
          value.length === 12
            ? false
            : true;
      }
    };

    const checkError = ref<boolean>(false);

    const checkoutBasketForm = () => {
      if (
        initialUser.value &&
        addressUser.value &&
        phoneUser.value &&
        emailUser.value &&
        actualDeliveryId.value &&
        actualPaymentId.value
      ) {
        const information: IOrderInformation = {
          name: initialUser.value,
          address: addressUser.value,
          phone: phoneUser.value,
          email: emailUser.value,
          deliveryTypeId: actualDeliveryId.value,
          paymentTypeId: actualPaymentId.value,
          comment: messageUser.value,
        };

        $store
          .dispatch("basket/fetchPostOrder", {
            token: localStorage.getItem("user_token"),
            information,
          })
          .then(() => {
            localStorage.setItem("user_token", "");
            $router.push({
              name: "SuccessfulOrderPage",
            });
          });
      } else {
        checkError.value = true;

        setTimeout(() => {
          checkError.value = false;
        }, 3000);
      }
    };

    watch(
      () => $store.state.basket.items,
      (listProductActual) => {
        listProduct.value = listProductActual;
      }
    );

    onMounted(() => {
      $store.dispatch("basket/fetchAddDeliveries").then((res) => {
        deliveries.value = res;
      });
    });

    return {
      initialUser,
      addressUser,
      phoneUser,
      checkPhone,
      changePhone,
      emailUser,
      messageUser,
      checkoutBasketForm,

      payments,
      toggleActualPaymentId,
      definePayment,

      listProduct,
      totalPrice,
      numberProductToBasket,

      deliveries,
      actualDelivery,

      checkError,
    };
  },
});
</script>
