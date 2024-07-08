import React, { createContext} from "react";
import { CartItem } from "../data/interfaces/CartData.interface";

interface ICartContext {
    cartData: CartItem[]
    setCartData: React.Dispatch<React.SetStateAction<CartItem[]>>
}

export const CartContext = createContext<ICartContext>({ cartData: [], setCartData: () => {}});