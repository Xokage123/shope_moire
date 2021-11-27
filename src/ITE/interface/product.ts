export interface IProductsListProps {
  categoryId?: number;
  materialIds?: Array<number>;
  seasonIds?: Array<number>;
  colorIds?: Array<number>;
  minPrice?: number;
  maxPrice?: number;
}

export interface IInitialFilterProps extends IProductsListProps {
  limit: number;
  page: number;
}

export interface IProductInBasket {
  productId: string;
  colorId: string;
  sizeId: string;
  quantity: string;
}
