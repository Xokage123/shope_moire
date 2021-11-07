<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#">
      <img
        class="catalog__image"
        :src="product.colors[0].gallery[0].file.url"
        alt="Название товара"
      />
    </a>

    <h3 class="catalog__title">
      <a href="#"> {{ product.title }} </a>
    </h3>

    <span class="catalog__price"> {{ product.price }} ₽ </span>

    <ul class="colors colors--black">
      <li
        :key="color.id"
        :color="color"
        v-for="color in product.colors"
        class="colors__item"
      >
        <label class="colors__label">
          <input
            class="colors__radio sr-only"
            type="radio"
            name="color-1"
            :value="color.color.code"
            checked=""
          />
          <span
            class="colors__value"
            :style="{
              background: color.color.code,
              border: '1px solid black',
            }"
          >
          </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    product: {
      type: Object,
    },
  },
  setup(props) {
    // console.log(props.product);
  },
});
</script>

<style lang="scss" scoped>
.catalog {
  &__item {
    &:hover {
      box-shadow: 0 0 10px black;
    }
  }

  &__image {
    width: 100%;
  }
}
</style>
