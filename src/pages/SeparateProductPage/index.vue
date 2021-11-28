<template>
  <div v-if="productInfo">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link
            :to="{
              name: 'ProductsPage',
            }"
            >Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="#">
            {{ productInfo.category.title }}
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> {{ productInfo.title }} </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img
            width="570"
            height="570"
            src="img/product-square-1.jpg"
            srcset="img/product-square-1@2x.jpg 2x"
            alt="Название товара"
          />
        </div>
        <ul v-if="productInfo.colors[0].gallery" class="pics__list">
          <li class="pics__item">
            <a href="" class="pics__link pics__link--current">
              <img
                width="98"
                height="98"
                src="img/product-square-2.jpg"
                srcset="img/product-square-2@2x.jpg 2x"
                alt="Название товара"
              />
            </a>
          </li>
          <li class="pics__item">
            <a href="" class="pics__link">
              <img
                width="98"
                height="98"
                src="img/product-square-3.jpg"
                srcset="img/product-square-3@2x.jpg 2x"
                alt="Название товара"
              />
            </a>
          </li>
        </ul>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ productInfo.id }}</span>
        <h2 class="item__title">{{ productInfo.title }}</h2>
        <div class="item__form">
          <form class="form" @submit.prevent="addProductInBasket">
            <div class="item__row item__row--center">
              <div class="form__counter">
                <button
                  @click="removeOneGood"
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

                <input v-model="quantityOfGood" type="number" name="count" />

                <button
                  @click="addOneGood"
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

              <b class="item__price"> {{ productInfo.price }} ₽ </b>
            </div>

            <div class="item__row">
              <fieldset class="form__block">
                <legend class="form__legend">Цвет</legend>
                <ul class="colors colors--black">
                  <li
                    :key="color.color.id"
                    :color="color"
                    v-for="color in productInfo.colors"
                    class="colors__item"
                  >
                    <label class="colors__label">
                      <input
                        class="colors__radio sr-only"
                        type="radio"
                        name="color-item"
                        :value="color.color.id"
                        @click="toggleColor"
                      />
                      <span
                        class="colors__value"
                        :style="{
                          backgroundColor: color.color.code,
                        }"
                      >
                      </span>
                    </label>
                  </li>
                </ul>
              </fieldset>

              <fieldset class="form__block">
                <legend class="form__legend">Размер</legend>
                <label
                  class="form__label form__label--small form__label--select"
                >
                  <select
                    @change="toggleSize"
                    class="form__select"
                    type="text"
                    name="category"
                  >
                    <option
                      :key="size.id"
                      :size="size.title"
                      v-for="size in productInfo.sizes"
                      :value="size.id"
                    >
                      {{ size.title }}
                    </option>
                  </select>
                </label>
              </fieldset>
            </div>

            <button class="item__button button button--primery" type="submit">
              В корзину
            </button>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current"> Информация о товаре </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#"> Доставка и возврат </a>
          </li>
        </ul>

        <div class="item__content">
          <h3>Состав:</h3>

          <p>
            60% хлопок<br />
            30% полиэстер<br />
          </p>

          <h3>Уход:</h3>

          <p>
            Машинная стирка при макс. 30ºC короткий отжим<br />
            Гладить при макс. 110ºC<br />
            Не использовать машинную сушку<br />
            Отбеливать запрещено<br />
            Не подвергать химчистке<br />
          </p>
        </div>
      </div>
    </section>
  </div>
  <div v-else>Подождите, идет загрузка...</div>
</template>

<script lang="ts">
// Vue
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
// API
import { getProductInfo } from "@/api/index";
// Type
import type { IRootStore } from "@/store/types";
import { IProductInBasket } from "@/ITE/interface/product";

export default defineComponent({
  setup() {
    const $route = useRoute();
    const $store = useStore<IRootStore>();

    let productInfo = ref<null | Record<string, unknown>>(null);

    const productId = ref<number>(0);
    const sizeIdUser = ref<number>(0);
    const colorIdUser = ref<number>(0);
    const quantityOfGood = ref<number>(0);

    const toggleSize = (ev: any) => {
      sizeIdUser.value = ev.target.value;
    };
    const toggleColor = (ev: any) => {
      colorIdUser.value = ev.target.value;
    };

    const removeOneGood = () => {
      if (quantityOfGood.value > 0) {
        quantityOfGood.value = quantityOfGood.value - 1;
      }
    };

    const addOneGood = () => {
      quantityOfGood.value = quantityOfGood.value + 1;
    };

    const addProductInBasket = () => {
      if (
        productId.value &&
        colorIdUser.value &&
        sizeIdUser.value &&
        quantityOfGood.value &&
        localStorage.getItem("user_token")
      ) {
        $store
          .dispatch("basket/fetchAddProductInBasket", {
            information: {
              productId: String(productId.value),
              colorId: String(colorIdUser.value),
              sizeId: String(sizeIdUser.value),
              quantity: String(quantityOfGood.value),
            } as IProductInBasket,
            token: localStorage.getItem("user_token"),
          })
          .then((res) => {
            console.log(res);
          });
      }
    };

    getProductInfo(Number($route.params.id)).then((product) => {
      productInfo.value = product;
      productId.value = product.id;
      sizeIdUser.value = product.sizes[0].id;
    });

    return {
      productInfo,
      quantityOfGood,

      toggleSize,
      toggleColor,
      addProductInBasket,
      removeOneGood,
      addOneGood,
    };
  },
});
</script>

<style lang="scss" scoped>
.colors {
  &__value {
    border: 1px solid black;
  }
}
</style>
