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
          <form class="form" @submit="addToOrder">
            <div class="item__row item__row--center">
              <div class="form__counter">
                <button
                  @click="removeOneGood"
                  type="button"
                  aria-label="Убрать один товар"
                >
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>

                <input v-model="quantityOfGood" type="number" name="count" />

                <button
                  @click="addOneGood"
                  type="button"
                  aria-label="Добавить один товар"
                >
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
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
                        :value="color.color.title"
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
                      :value="size.title"
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
// API
import { getProductInfo } from "@/api/index";

export default defineComponent({
  setup() {
    const $route = useRoute();

    let productInfo = ref(null);

    const sizeUser = ref<string | null>(null);

    const quantityOfGood = ref<number>(0);

    const toggleSize = (ev: any) => {
      sizeUser.value === ev.target.value;
    };

    const removeOneGood = () => {
      if (quantityOfGood.value > 0) {
        quantityOfGood.value = quantityOfGood.value - 1;
      }
    };

    const addOneGood = () => {
      quantityOfGood.value = quantityOfGood.value + 1;
    };

    const addToOrder = () => {
      if (sizeUser.value) {
        console.log("Еуые");
      }
    };

    getProductInfo(Number($route.params.id)).then((product) => {
      console.log(product);
      productInfo.value = product;
    });

    return {
      productInfo,
      quantityOfGood,

      toggleSize,
      addToOrder,
      removeOneGood,
      addOneGood,
    };
  },
});
</script>
