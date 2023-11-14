describe('post error', () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3001/api/v1/orders", {
      statusCode: 200,
      fixture: "orders.json",
  }).as("getOrders")

    cy.intercept("POST", "http://localhost:3001/api/v1/orders", {
    statusCode: 200,
    fixture: "postorder.json",
  }).as("postOrders")

    cy.visit("http://localhost:3000")
    cy.wait('@getOrders')
  })

  it("should display an error when invalid order", () => {
    // no name, no ingredient
    cy.url().should('eq', 'http://localhost:3000/');
    cy.get('.order').should('have.length', 3);
    cy.get('.submit-order-btn').click();
    cy.get('.form-error').contains('Please enter a name and select at least one ingredient').should('exist');
    cy.get('.order').should('have.length', 3);

    // with name, no ingredient
    cy.get('.order').should('have.length', 3);
    cy.get('input[name=name]').type('Mr. Bean');
    cy.get('.submit-order-btn').click();
    cy.get('.form-error').contains('Select at least one ingredient').should('exist');
    cy.get('.order').should('have.length', 3);

    // no name, with ingredient
    cy.get('.order').should('have.length', 3);
    cy.get('input[name=name]').clear();
    cy.get('form').contains('button', 'beans').click();
    cy.get('p').contains('Order: beans');
    cy.get('.submit-order-btn').click();
    cy.get('.form-error').contains('Please enter a name').should('exist');
    cy.get('.order').should('have.length', 3);

    // with name, with ingredient
    cy.get('input[name=name]').type('Johann');
    cy.get('p').contains('Order: beans');
    cy.get('.submit-order-btn').click();
    cy.wait('@postOrders');
    cy.url().should('eq', 'http://localhost:3000/');
    cy.get('.form-error').should('not.exist');
    cy.get('p').contains('Order: Nothing selected');
    cy.get('.order').should('have.length', 4);
    cy.get('.order').last().contains('Johann');
    cy.get('.order').last().contains('beans');
    cy.get('.order').last().contains('lettuce');
  })
})
