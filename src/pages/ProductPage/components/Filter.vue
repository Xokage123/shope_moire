<template>
  <aside class="filter">
    <form class="filter__form form" action="#" method="get">
      <!-- Цена -->
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input
            v-model="priceFilter.start"
            class="form__input"
            type="number"
            name="min-price"
          />
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input
            v-model="priceFilter.end"
            class="form__input"
            type="number"
            name="max-price"
          />
          <span class="form__value">До</span>
        </label>
      </fieldset>
      <!-- Категории -->
      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select
            v-model="actualCategoryId"
            class="form__select"
            name="category"
          >
            <option value="0" label="Все категории" />
            <option
              :key="category.id"
              :label="category.title"
              :value="category.id"
              v-for="category in categoryList"
            />
          </select>
        </label>
      </fieldset>
      <!-- Материалы -->
      <fieldset class="form__block">
        <legend class="form__legend">Материал</legend>
        <ul v-if="materialsList.length" class="check-list">
          <li
            :key="material.id"
            v-for="material in materialsList"
            class="check-list__item"
          >
            <label class="check-list__label">
              <input
                :value="material.id"
                class="check-list__check sr-only"
                type="checkbox"
                name="material"
                v-model="actualMaterialsList"
              />
              <span class="check-list__desc">
                {{ material.title }}
                <span>({{ material.productsCount }})</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>
      <!-- Цвета -->
      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
        <ul v-if="colorsList.length" class="colors colors--black">
          <li :key="color.id" v-for="color in colorsList" class="colors__item">
            <label class="colors__label">
              <input
                v-model="actualColorsList"
                :value="color.id"
                class="colors__radio sr-only"
                type="checkbox"
                name="color"
              />
              <span
                class="colors__value"
                :style="{
                  background: color.code,
                }"
              ></span>
            </label>
          </li>
        </ul>
      </fieldset>
      <!-- Сезоны -->
      <fieldset class="form__block">
        <legend class="form__legend">Коллекция</legend>
        <ul v-if="seasonsList.length" class="check-list">
          <li
            :season="season"
            :key="season.id"
            v-for="season in seasonsList"
            class="check-list__item"
          >
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="collection"
                :value="season.id"
                v-model="actualSeasonsList"
              />
              <span class="check-list__desc">
                {{ season.title }}
                <span>({{ season.productsCount }})</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>
      <!-- Применить фильтрацию -->
      <button
        @click.prevent="applyFilter"
        class="filter__submit button button--primery"
        type="submit"
      >
        Применить
      </button>
      <!-- Сбросить фильтрацию -->
      <button
        @click.prevent="clearFilters"
        class="filter__reset button button--second"
        type="button"
      >
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

import type { IRootStore } from "@/store/types";
import type { IProductsListProps } from "@/ITE/interface/product";

interface IPriceProps {
  start: number;
  end: number;
}

export default defineComponent({
  name: "FilterComponent",
  setup() {
    const $router = useRouter();
    const $route = useRoute();
    const $store = useStore<IRootStore>();

    // Цена
    const priceFilter = reactive<IPriceProps>({
      start: 0,
      end: 0,
    });

    const queryRouteType = ref<string>(
      $route.query.type ? ($route.query.type as string) : ""
    );

    const actualCategoryId = ref<number>(0);
    const actualSeasonsList = ref<Array<number>>([]);
    const actualMaterialsList = ref<Array<number>>([]);
    const actualColorsList = ref<Array<number>>([]);

    const categoryList = ref($store.state.filters.categoriesProduct);
    const seasonsList = ref($store.state.filters.seasonsList);
    const materialsList = ref($store.state.filters.materialList);
    const colorsList = ref($store.state.filters.colorsList);

    // Применение фильтров
    const applyFilter = () => {
      let actualTypeId = actualCategoryId.value;

      if (queryRouteType.value && !actualCategoryId.value) {
        const actualType: any = categoryList.value.find((type: any) => {
          return type.title === queryRouteType.value;
        });

        actualTypeId = actualType.id;

        actualCategoryId.value = actualTypeId;
      } else {
        if ($route.query.type) {
          $router.push({
            name: "ProductsPage",
            query: {},
          });
        }
      }

      const filter: IProductsListProps = {
        minPrice: priceFilter.end,
        maxPrice: priceFilter.start,
        categoryId: actualTypeId,
        materialIds: actualMaterialsList.value,
        colorIds: actualColorsList.value,
        seasonIds: actualSeasonsList.value,
      };

      localStorage.setItem("useFilters", JSON.stringify(filter));

      $store.dispatch("products/loadListProduct", {
        numberPage: 1,
        filtersObject: filter,
      });
    };

    const clearFilters = () => {
      priceFilter.start = 0;
      priceFilter.end = 0;
      actualCategoryId.value = 0;
      actualSeasonsList.value = [];
      actualMaterialsList.value = [];
      actualColorsList.value = [];
      $store
        .dispatch("products/loadListProduct", {
          numberPage: 1,
        })
        .then(() => {
          localStorage.setItem(
            "useFilters",
            JSON.stringify({
              minPrice: 0,
              maxPrice: 0,
              categoryId: 0,
              materialIds: [],
              colorIds: [],
              seasonIds: [],
            })
          );
        });
    };

    if (queryRouteType.value && categoryList.value.length) {
      applyFilter();
    }

    watch(
      () => priceFilter.start,
      (newValue) => {
        if (newValue < 0) priceFilter.start = 0;
      }
    );

    watch(
      () => priceFilter.end,
      (newValue) => {
        if (newValue < 0) priceFilter.end = 0;
      }
    );

    watch(
      () => categoryList.value,
      () => {
        applyFilter();
      }
    );

    onMounted(() => {
      if (!$store.state.filters.categoriesProduct.length) {
        // Получаем актуальные категории
        $store.dispatch("filters/loadCategory").then((list) => {
          categoryList.value = list;
        });
      }
      if (!$store.state.filters.seasonsList.length) {
        // Получаем актуальные сезоны
        $store.dispatch("filters/loadSeasons").then((seasons) => {
          seasonsList.value = seasons;
        });
      }
      // Получаем актуальные материалы
      $store.dispatch("filters/loadMaterial").then((materials) => {
        materialsList.value = materials;
      });
      if (!$store.state.filters.colorsList.length) {
        // Получаем актуальные цвета
        $store.dispatch("filters/loadColors").then((сolors) => {
          colorsList.value = сolors;
        });
      }
    });

    return {
      applyFilter,
      clearFilters,

      priceFilter,

      categoryList,
      seasonsList,
      materialsList,
      colorsList,

      actualCategoryId,
      actualSeasonsList,
      actualMaterialsList,
      actualColorsList,
    };
  },
});
</script>

<style lang="scss" scoped>
.check {
  &-list {
    &__color {
      width: 20px;
      height: 20px;
    }
  }
}
.colors {
  &__value {
    border: 1px solid black;
  }
}
</style>
