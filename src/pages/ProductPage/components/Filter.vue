<template>
  <aside class="filter">
    <form class="filter__form form" action="#" method="get">
      <!-- Цена -->
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input
            v-model="priceFilter.end"
            class="form__input"
            type="number"
            name="min-price"
          />
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input
            v-model="priceFilter.start"
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
                @click="addmaterialInList(material.id)"
                :value="material.title"
                class="check-list__check sr-only"
                type="checkbox"
                name="material"
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
        <ul v-if="colorsList.length" class="check-list">
          <li
            :key="color.id"
            v-for="color in colorsList"
            class="check-list__item"
          >
            <label class="check-list__label">
              <input
                @click="addActualColor(color.id)"
                :value="color.title"
                class="check-list__check sr-only"
                type="checkbox"
                name="color"
              />
              <span
                class="check-list__desc"
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
                @click="addActualSeason(season.id)"
                class="check-list__check sr-only"
                type="checkbox"
                name="collection"
                :value="season.title"
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
import { defineComponent, onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";

import type { IRootStore } from "@/store/types";
import type { IProductsListProps } from "@/ITE/interface/product";

interface IPriceProps {
  start: number;
  end: number;
}

export default defineComponent({
  name: "FilterComponent",
  setup() {
    const $store = useStore<IRootStore>();

    // Цена
    const priceFilter = reactive<IPriceProps>({
      start: 0,
      end: 0,
    });

    const actualCategoryId = ref<number | null>(null);

    const actualSeasonsList = ref<Array<number>>([]);
    const addActualSeason = (id: number) => {
      const check = actualSeasonsList.value.some((arrayId) => {
        return arrayId === id;
      });
      if (check) {
        actualSeasonsList.value = actualSeasonsList.value.filter((arrayId) => {
          return arrayId !== id;
        });
      } else {
        actualSeasonsList.value.push(id);
      }
    };

    const actualMaterialsList = ref<Array<number>>([]);
    const addmaterialInList = (id: number) => {
      const check = actualMaterialsList.value.some((arrayId) => {
        return arrayId === id;
      });
      if (check) {
        actualMaterialsList.value = actualMaterialsList.value.filter(
          (arrayId) => {
            return arrayId !== id;
          }
        );
      } else {
        actualMaterialsList.value.push(id);
      }
    };

    const actualColorsList = ref<Array<number>>([]);
    const addActualColor = (id: number) => {
      const check = actualColorsList.value.some((colorId) => {
        return colorId === id;
      });
      if (check) {
        actualColorsList.value = actualColorsList.value.filter((colorId) => {
          return colorId !== id;
        });
      } else {
        actualColorsList.value.push(id);
      }
    };

    const categoryList = ref($store.state.filters.categoriesProduct);
    const seasonsList = ref($store.state.filters.seasonsList);
    const materialsList = ref($store.state.filters.materialList);
    const colorsList = ref($store.state.filters.colorsList);

    // Применение фильтров
    const applyFilter = () => {
      if (actualCategoryId.value) {
        const filter: IProductsListProps = {
          minPrice: priceFilter.start,
          maxPrice: priceFilter.end,
          categoryId: actualCategoryId.value,
          materialIds: actualMaterialsList.value,
          colorIds: actualColorsList.value,
          seasonIds: actualSeasonsList.value,
        };

        $store.dispatch("products/loadListProduct", {
          numberPage: 1,
          filtersObject: filter,
        });
      }
    };
    // Очистка фильтра
    const clearFilters = () => {
      priceFilter.start = 0;
      priceFilter.end = 0;
      actualCategoryId.value = null;
      actualSeasonsList.value = [];
      actualMaterialsList.value = [];
      actualColorsList.value = [];
    };

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
      if (!$store.state.filters.materialList.length) {
        // Получаем актуальные материалы
        $store.dispatch("filters/loadMaterial").then((materials) => {
          materialsList.value = materials;
        });
      }
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
      actualCategoryId,

      seasonsList,
      addActualSeason,

      materialsList,
      addmaterialInList,

      colorsList,
      addActualColor,
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
</style>
