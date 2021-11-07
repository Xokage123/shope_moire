<template>
  <aside class="filter">
    <form class="filter__form form" action="#" method="get">
      <!-- Фильтр по ценам -->
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input
            class="form__input"
            type="number"
            name="min-price"
            v-model="priceFilter.start"
          />
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input
            class="form__input"
            type="number"
            name="max-price"
            v-model="priceFilter.end"
          />
          <span class="form__value">До</span>
        </label>
      </fieldset>
      <!-- Фильтр по категориям -->
      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select v-model="categoryId" class="form__select" name="category">
            <option
              :key="category.id"
              :label="category.title"
              :value="category.id"
              v-for="category in categoryList"
            />
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Материал</legend>
        <ul class="check-list">
          <li class="check-list__item">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="material"
                value="лен"
              />
              <span class="check-list__desc">
                лен
                <span>(3)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="material"
                value="хлопок"
              />
              <span class="check-list__desc">
                хлопок
                <span>(46)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="material"
                value="шерсть"
              />
              <span class="check-list__desc">
                шерсть
                <span>(20)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="material"
                value="шелк"
              />
              <span class="check-list__desc">
                шелк
                <span>(30)</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Коллекция</legend>
        <ul class="check-list">
          <li class="check-list__item">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="collection"
                value="лето"
                checked=""
              />
              <span class="check-list__desc">
                лето
                <span>(2)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="collection"
                value="зима"
              />
              <span class="check-list__desc">
                зима
                <span>(53)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="collection"
                value="весна"
              />
              <span class="check-list__desc">
                весна
                <span>(24)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="collection"
                value="осень"
              />
              <span class="check-list__desc">
                осень
                <span>(30)</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <button
        @click.prevent="applyFilter"
        class="filter__submit button button--primery"
        type="submit"
      >
        Применить
      </button>
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
// Vue
import { defineComponent, onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
// Interface
import type { State } from "@/store/index";

interface IPriceProps {
  start: number;
  end: number;
}

export default defineComponent({
  name: "FilterComponent",
  setup() {
    const $store = useStore<State>();

    // Цена
    const priceFilter = reactive<IPriceProps>({
      start: 0,
      end: 0,
    });
    // Категория
    let categoryId = ref(null);
    let categoryList = ref($store.state.categoriesProduct);

    // Применение фильтров
    const applyFilter = () => {
      console.log(categoryId.value);
    };
    // Очистка фильтра
    const clearFilters = () => {
      priceFilter.start = 0;
      priceFilter.end = 0;
    };

    onMounted(() => {
      // Получаем актуальные категории
      $store.dispatch("loadCategory").then((list) => {
        categoryList.value = list;
      });
    });

    return {
      priceFilter,
      categoryId,
      categoryList,

      applyFilter,
      clearFilters,
    };
  },
});
</script>
