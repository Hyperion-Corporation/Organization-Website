describe('Navigation', () => {
  it('should navigate to Products from the primary nav', () => {
    cy.visit('/');
    cy.get('a[href="/content/products"]').first().click();
    cy.url().should('include', '/content/products');
    cy.contains(/Products|Visual Graph Programming/i).should('be.visible');
  });

  it('should open the products page directly', () => {
    cy.visit('/content/products');
    cy.contains('Products').should('be.visible');
    cy.contains('Visual Graph Programming').should('be.visible');
  });
});

