import axios from "axios";

const BASE_PATH = "https://vue-moire.skillbox.cc/api";

const instance = axios.create({
  baseURL: BASE_PATH,
  method: "GET",
});

export const getProductCategories = async () => {
  const responce = await instance({
    url: "/productCategories",
  });

  return responce.data.items;
};

interface IProductsListProps {
  categoryId?: string;
}

interface IInitialFilterProps extends IProductsListProps {
  limit: number;
  page: number;
}

const initialPropsProductList: IInitialFilterProps = {
  limit: 12,
  page: 1,
};

export const getProductsList = async (
  numberPage: number,
  filter?: IProductsListProps
) => {
  const productList = await instance({
    url: "/products",
    params: filter
      ? {
          ...initialPropsProductList,
          categoryId: filter.categoryId,
          page: numberPage ? numberPage : initialPropsProductList.page,
        }
      : initialPropsProductList,
  });
  return productList.data;
};

export const getProductInfo = async (id: number) => {
  const product = await instance({
    url: `/products/${id}`,
  });

  return product.data;
};
