import { CartItem } from "../../data/interfaces/CartData.interface";
import { ItemData } from "../../data/interfaces/ItemsData.interface";

export const getCartItemQuantity = (cartData: CartItem[], sku: number) => {
  const foundCartItemBySku = cartData.find((item) => item.sku === sku);
  return foundCartItemBySku?.qty ?? 0;
};

export const getTotalCostOfItem = (
  cartData: CartItem[],
  sku: number,
  catalogData: ItemData[]
) => {
  const foundCartItemBySku = cartData.find((item) => item.sku === sku);
  if (foundCartItemBySku === undefined || foundCartItemBySku.qty === 0) {
    return 0;
  }
  const foundCatalogItemBySku = catalogData.find((item) => item.sku === sku);
  return foundCartItemBySku!!.qty * foundCatalogItemBySku!!.price;
};
