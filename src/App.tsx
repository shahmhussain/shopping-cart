import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ItemsListPage } from "./pages/ItemsList/ItemsListPage";
import { CheckoutPage } from "./pages/Checkout/CheckoutPage";
import Layout from "./components/Layout/Layout";
import { CartItem } from "./data/interfaces/CartData.interface";
import defaultCartData from "./data/cart_data.json";
import { CartContext } from "./utils/CartContext";

function App() {
  const [cartData, setCartData] = useState<CartItem[]>(defaultCartData.cart);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <CartContext.Provider value={{ cartData, setCartData }}>
                <ItemsListPage />
              </CartContext.Provider>
            }
          />
          <Route
            path="checkout"
            element={
              <CartContext.Provider value={{ cartData, setCartData }}>
                <CheckoutPage/>
              </CartContext.Provider>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
