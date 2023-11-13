describe('homepage', () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3001/api/v1/orders", {
      statusCode: 200,
      fixture: "orders",
  }).as("getOrders")
  cy.visit("http://localhost:3000")
  cy.wait('@getOrders')
  })

  it("user first visit", () => {
    cy.url().should('eq', 'http://localhost:3000/');
    cy.get('h1').should('exist').contains('Burrito Builder');
    cy.get('form').find('input[name=name]').should('exist');
    cy.get('form').contains('button', 'beans').should('exist');
    cy.get('form').contains('button', 'steak').should('exist');
    cy.get('form').contains('button', 'carnitas').should('exist');
    cy.get('form').contains('button', 'sofritas').should('exist');
    cy.get('form').contains('button', 'lettuce').should('exist');
    cy.get('form').contains('button', 'queso fresco').should('exist');
    cy.get('form').contains('button', 'pico de gallo').should('exist');
    cy.get('form').contains('button', 'hot sauce').should('exist');
    cy.get('form').contains('button', 'guacamole').should('exist');
    cy.get('form').contains('button', 'jalapenos').should('exist');
    cy.get('form').contains('button', 'cilantro').should('exist');
    cy.get('form').contains('button', 'sour cream').should('exist');    

    cy.get('p').contains('Order: Nothing selected').should('exist');
    cy.get('.submit-order-btn').contains('Submit Order').should('exist');
    cy.get('.order').should('have.length', 3);

    cy.get('.order').eq(0).contains('Pat');
    cy.get('.order').eq(0).contains('beans');
    cy.get('.order').eq(0).contains('lettuce');
    cy.get('.order').eq(0).contains('carnitas');
    cy.get('.order').eq(0).contains('queso fresco');
    cy.get('.order').eq(0).contains('jalapeno');

    cy.get('.order').eq(1).contains('Sam');
    cy.get('.order').eq(1).contains('steak');
    cy.get('.order').eq(1).contains('pico de gallo');
    cy.get('.order').eq(1).contains('lettuce');
    cy.get('.order').eq(1).contains('carnitas');
    cy.get('.order').eq(1).contains('queso fresco');
    cy.get('.order').eq(1).contains('jalapeno');

    cy.get('.order').eq(2).contains('Alex');
    cy.get('.order').eq(2).contains('sofritas');
    cy.get('.order').eq(2).contains('beans');
    cy.get('.order').eq(2).contains('sour cream');
    cy.get('.order').eq(2).contains('carnitas');
    cy.get('.order').eq(2).contains('queso fresco');
  })
})
