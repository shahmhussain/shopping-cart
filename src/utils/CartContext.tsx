import React, { createContext} from "react";
import { CartItem } from "../data/interfaces/CartData.interface";

/* 
    NOTE - Using Context API is overkill for this project as the props are only
    one level deep, i added it as it as it was requested on the tech test
*/

interface ICartContext {
    cartData: CartItem[]
    setCartData: React.Dispatch<React.SetStateAction<CartItem[]>>
}

export const CartContext = createContext<ICartContext>({ cartData: [], setCartData: () => {}});