import { CartItem } from "../../data/interfaces/CartData.interface";
import { ItemData } from "../../data/interfaces/ItemsData.interface";

export const isItemInCart = (sku: number, cartData: CartItem[]): boolean => {
  const foundCartItemBySku = cartData.find((item) => item.sku === sku);
  return foundCartItemBySku !== undefined;
};

export const addCartData = (
  cartData: CartItem[],
  row: ItemData,
  setCartData: React.Dispatch<React.SetStateAction<CartItem[]>>
) => {
  const skuExistInCart = cartData.find((item) => item.sku === row.sku);
  if (skuExistInCart) {
    const removedSelectedSku = cartData.filter(
      (cart) => cart.sku !== skuExistInCart.sku
    );
    const newSkuData: CartItem = {
      sku: skuExistInCart.sku,
      qty: skuExistInCart.qty + 1,
    };
    setCartData([...removedSelectedSku, newSkuData]);
  } else {
    const newSkuData: CartItem = { sku: row.sku, qty: 1 };
    setCartData([...cartData, newSkuData]);
  }
};
export const removeCartData = (
  cartData: CartItem[],
  row: ItemData,
  setCartData: React.Dispatch<React.SetStateAction<CartItem[]>>
) => {
  const cartDataBySku = cartData.filter((item) => item.sku === row.sku);
  const removedSelectedSku = cartData.filter(
    (cart) => cart.sku !== cartDataBySku[0].sku
  );
  const updatedSkuData: CartItem = {
    sku: cartDataBySku[0].sku,
    qty: cartDataBySku[0].qty - 1,
  };

  if (updatedSkuData.qty === 0) {
    setCartData([...removedSelectedSku]);
  } else {
    setCartData([...removedSelectedSku, updatedSkuData]);
  }
};

export const getTotalCartItems = (cartData: CartItem[]) => {
  return cartData.reduce((acc, cartItem) => {
    return acc + cartItem.qty;
  }, 0);
};
export const getTotalCartCost = (
  cartData: CartItem[],
  itemsData: ItemData[]
) => {
  return cartData.reduce((acc, cartItem) => {
    const skuData = itemsData.find((item) => item.sku === cartItem.sku);
    const total = acc + cartItem.qty * skuData!!.price;
    return total;
  }, 0);
};

export const isBasketLimitExceeded = (
  userCartData: CartItem[],
  selectedItem: ItemData
): boolean => {
  const selectedItemSkuQuantity =
    userCartData.find((userCartItem) => userCartItem.sku === selectedItem.sku)
      ?.qty || 0;
  return selectedItemSkuQuantity >= selectedItem.basketLimit;
};
