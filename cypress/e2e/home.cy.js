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
    cy.get('form button').should('have.length', 13);  

    cy.get('p').contains('Order: Nothing selected').should('exist');
    cy.get('.submit-order-btn').contains('Submit Order').should('exist');
    cy.get('.order').should('have.length', 3);

    cy.get('.order').first().contains('Pat');
    cy.get('.order').first().contains('beans');
    cy.get('.order').first().contains('lettuce');
    cy.get('.order').first().contains('carnitas');
    cy.get('.order').first().contains('queso fresco');
    cy.get('.order').first().contains('jalapeno');

    cy.get('.order').last().contains('Alex');
    cy.get('.order').last().contains('sofritas');
    cy.get('.order').last().contains('beans');
    cy.get('.order').last().contains('sour cream');
    cy.get('.order').last().contains('carnitas');
    cy.get('.order').last().contains('queso fresco');
  })
})
