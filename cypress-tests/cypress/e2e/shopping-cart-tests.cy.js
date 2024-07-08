/* eslint-disable no-undef */

describe('Shopping Cart Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it(`GIVEN user is on the 'items list page' 
        AND clicks add item on the second ADD item element
        AND clicks on the checkout button
        THEN orange should have a quantity of 2
        AND the total item quantity should be 5
        AND the total cost should be 9.09`, () => {
    cy.get('[data-testid="item-list-add-item-1"]').click().click()
    cy.get('[data-testid="item-list-total-cart-cost"]').first().should('have.text', '9.09')

    cy.get('[data-testid="item-list-checkout"]').click()
    
    cy.get('[data-testid="checkout-page-quantity-1"]').should('have.text', '2')
    
    // orange total cost
    cy.get('[data-testid="checkout-page-total-cost-1"]').should('have.text', '4.04')
    // total basket item quantity
    cy.get('[data-testid="checkout-page-total-items"]').should('have.text', '5')

    // checkout page total cost
    cy.get('[data-testid="checkout-page-cost"]').should('have.text', '9.09')
  })

})
