import { BrowserRouter } from "react-router-dom";
import { CheckoutPage } from "./CheckoutPage";
import { fireEvent, render, screen } from "@testing-library/react";
import { CartContext } from "../../utils/CartContext";

describe("Checkout Page", () => {
  const mockSetCartFn = jest.fn();
  it("should render checkout page with the correct quantities and total", () => {
    render(
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartData: [
              { sku: 1, qty: 3 },
              { sku: 3, qty: 2 },
            ],
            setCartData: mockSetCartFn,
          }}
        >
          <CheckoutPage />
        </CartContext.Provider>
      </BrowserRouter>
    );
    expect(screen.getByTestId("checkout-page")).toBeInTheDocument();

    // quantity column
    expect(screen.getByTestId('checkout-page-quantity-0').textContent).toBe('3')
    expect(screen.getByTestId('checkout-page-quantity-1').textContent).toBe('0')
    expect(screen.getByTestId('checkout-page-quantity-2').textContent).toBe('2')

    // total amount column
    expect(screen.getByTestId('checkout-page-total-cost-0').textContent).toBe('3.03')
    expect(screen.getByTestId('checkout-page-total-cost-1').textContent).toBe('0.00')
    expect(screen.getByTestId('checkout-page-total-cost-2').textContent).toBe('6.06')
  });

  describe("add item functionality", () => {
    it(`should show the FIRST add item button as disabled WHEN basket limit has been met`, () => {
        render(
          <BrowserRouter>
            <CartContext.Provider
              value={{
                cartData: [
                  { sku: 1, qty: 3 },
                  { sku: 3, qty: 1 },
                ],
                setCartData: mockSetCartFn,
              }}
            >
              <CheckoutPage />
            </CartContext.Provider>
          </BrowserRouter>
        );
  
        const items = screen.getAllByRole("button", { name: "Add Item" });
        expect(items[0]).toBeDisabled();
      });
      
      it("should call setCartData with an increased quantity of 1 WHEN basket limit has NOT been met for the first item", () => {
        const mockSetCartFn = jest.fn();
        render(
          <BrowserRouter>
            <CartContext.Provider
              value={{
                cartData: [
                  { sku: 3, qty: 1 },
                ],
                setCartData: mockSetCartFn,
              }}
            >
              <CheckoutPage />
            </CartContext.Provider>
          </BrowserRouter>
        );
  
        const addItemsBtn = screen.getAllByRole("button", { name: "Add Item" });
        expect(addItemsBtn[0]).not.toBeDisabled();
  
        fireEvent.click(addItemsBtn[0]);
        expect(mockSetCartFn).toBeCalledWith([
          { qty: 1, sku: 3 },
          { qty: 1, sku: 1 },
        ]);
      });
  })

  describe("remove item functionality", () => {
    it("should show the FIRST remove button item as disabled WHEN there are no items in the basket", () => {
      render(
        <BrowserRouter>
          <CartContext.Provider
            value={{
              cartData: [{ sku: 3, qty: 1 }],
              setCartData: mockSetCartFn,
            }}
          >
            <CheckoutPage />
          </CartContext.Provider>
        </BrowserRouter>
      );

      const removeBtns = screen.getAllByRole("button", { name: "Remove" });
      expect(removeBtns[0]).toBeDisabled();
    });
    
    it("should call setCartData with a quantity of decreased by 1 WHEN item exists in the cart", () => {
      const mockSetCartFn = jest.fn();
      render(
        <BrowserRouter>
          <CartContext.Provider
            value={{
              cartData: [
                { sku: 1, qty: 1 },
                { sku: 3, qty: 1 },
              ],
              setCartData: mockSetCartFn,
            }}
          >
            <CheckoutPage />
          </CartContext.Provider>
        </BrowserRouter>
      );

      const removeBtns = screen.getAllByRole("button", { name: "Remove" });
      expect(removeBtns[0]).not.toBeDisabled();

      fireEvent.click(removeBtns[0]);
      expect(mockSetCartFn).toBeCalledWith([
        { sku: 3, qty: 1 },
      ]);
    });
  });
});
