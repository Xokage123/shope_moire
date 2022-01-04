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
          <router-link
            :to="{
              name: 'ProductsPage',
              query: {
                type: productInfo.category.title,
              },
            }"
          >
            {{ productInfo.category.title }}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> {{ productInfo.title }} </a>
        </li>
      </ul>
    </div>

    <section v-if="colorActive" class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img
            width="570"
            height="570"
            :src="
              colorActive.gallery
                ? colorActive.gallery[0].file.url
                : NoProductPhoto
            "
            alt="Название товара"
          />
        </div>
        <ul class="pics__list">
          <li
            :key="photo.id"
            v-for="photo in productInfo.colors"
            class="pics__item"
          >
            <img
              v-if="!photo.gallery"
              class="pics__link"
              :class="{
                'pics__link--current': photo.color.id === colorActive.color.id,
              }"
              @click="colorActive = photo"
              width="98"
              height="98"
              :src="NoProductPhoto"
              alt="Название товара"
            />

            <img
              :key="image.file.name"
              class="pics__link"
              :class="{
                'pics__link--current': photo.color.id === colorActive.color.id,
              }"
              v-for="image in photo.gallery"
              @click="colorActive = photo"
              width="98"
              height="98"
              :src="image.file.url"
              alt="Название товара"
            />
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

                <input
                  v-model="quantityOfGood"
                  @change="checkQuantityOfGood"
                  type="text"
                  name="count"
                />

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

              <b v-if="+quantityOfGood" class="item__price">
                {{ productInfo.price * quantityOfGood }} ₽
              </b>
            </div>

            <div class="item__row">
              <fieldset class="form__block">
                <legend class="form__legend">Цвет</legend>
                <ul class="colors colors--black">
                  <li
                    :key="color.color.id"
                    :color="color"
                    v-for="(color, index) in productInfo.colors"
                    class="colors__item"
                  >
                    <label class="colors__label">
                      <input
                        class="colors__radio sr-only"
                        type="radio"
                        :checked="index === 0"
                        name="color"
                        :value="color"
                        v-model="colorActive"
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
import { defineComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { createToaster } from "@meforma/vue-toaster";

import { getProductInfo } from "@/api/index";

import { getOnlyPositiveNumber } from "@/utils/index";

import type { IRootStore } from "@/store/types";
import { IProductInBasket } from "@/ITE/interface/product";

import NoProductPhoto from "@/assets/image/no-photo-product.jpeg";

export default defineComponent({
  components: {},
  setup() {
    const $route = useRoute();
    const $router = useRouter();
    const $store = useStore<IRootStore>();
    const toaster = createToaster({
      duration: 2000,
    });

    const productInfo = ref<null | any>(null);

    const productId = ref<number>(0);
    const sizeIdUser = ref<number>(0);
    const colorActive = ref<any | null>(
      productInfo.value ? productInfo.value.colors[0] : null
    );
    const quantityOfGood = ref<number>(1);

    const toggleSize = (ev: any) => {
      sizeIdUser.value = ev.target.value;
    };

    const removeOneGood = () => {
      if (quantityOfGood.value > 1) {
        quantityOfGood.value = quantityOfGood.value - 1;
      }
    };

    const checkQuantityOfGood = (ev: any) => {
      quantityOfGood.value = getOnlyPositiveNumber(+ev.target.value);
    };

    const addOneGood = () => {
      quantityOfGood.value = quantityOfGood.value + 1;
    };

    const addProductInBasket = () => {
      if (
        productId.value &&
        colorActive.value &&
        sizeIdUser.value &&
        quantityOfGood.value &&
        localStorage.getItem("user_token")
      ) {
        toaster.info("Подождите, товар добавляется в корзину");
        $store
          .dispatch("basket/fetchAddProductInBasket", {
            information: {
              productId: String(productId.value),
              colorId: String(colorActive.value.color.id),
              sizeId: String(sizeIdUser.value),
              quantity: String(quantityOfGood.value),
            } as IProductInBasket,
            token: localStorage.getItem("user_token"),
          })
          .then(() => {
            toaster.success(`Товар успешно добавлен в корзину`);
          })
          .catch(() => {
            toaster.error(`Извините, нам не удалось добавить товар в корзину`);
            $router.push({
              name: "404",
            });
          });
      }
    };

    getProductInfo(Number($route.params.id))
      .then((product) => {
        colorActive.value = product.colors[0];
        productInfo.value = product;
        productId.value = product.id;
        sizeIdUser.value = product.sizes[0].id;
      })
      .catch(() => {
        $router.push({
          name: "404",
        });
      });

    return {
      colorActive,
      productInfo,
      quantityOfGood,

      toggleSize,
      addProductInBasket,
      removeOneGood,
      checkQuantityOfGood,
      addOneGood,

      NoProductPhoto,
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

.pics {
  &__link {
    cursor: pointer;
  }
}
</style>
