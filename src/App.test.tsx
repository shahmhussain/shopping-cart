import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('should render items list page on first time render', () => {
    render(<App/>)
    expect(screen.getByText("Items List")).toBeInTheDocument();
  })

  
  it(`should render items list page 
        THEN go to checkout page
        ThEN go to items list page
        WHEN user clicks checkout THEN clicks the back button`, () => {
    render(<App/>)
    const checkoutBtn = screen.getByRole("button", { name: "Checkout" });
    fireEvent.click(checkoutBtn);

    expect(screen.getByTestId('checkout-page')).toBeInTheDocument();

    const backBtn = screen.getByRole("button", { name: "Back" });
    fireEvent.click(backBtn);

    expect(screen.getByText("Items List")).toBeInTheDocument();
  })

})
