describe('post order', () => {
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

  it("should submit an order", () => {
    cy.url().should('eq', 'http://localhost:3000/');
    cy.get('input[name=name]').type('Johann');
    cy.get('form').contains('button', 'beans').click();
    cy.get('p').contains('Order: beans').should('exist')
    cy.get('form').contains('button', 'lettuce').click();
    cy.get('p').contains('Order: beans, lettuce').should('exist');
    cy.get('.submit-order-btn').click();

    cy.wait('@postOrders').then((interception) => {
      const { name, ingredients } = interception.request.body;
      cy.log(name, ingredients);
    });

    cy.get('.order').should('have.length', 4);
    
    cy.get('.order').eq(3).contains('Johann');
    cy.get('.order').eq(3).contains('beans');
    cy.get('.order').eq(3).contains('lettuce');
  })
})
