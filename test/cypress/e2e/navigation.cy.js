describe('Navigation', () => {
  it('should navigate to FAQ from the primary nav', () => {
    cy.visit('/');
    cy.get('a[href="/content/faq"]').first().click();
    cy.url().should('include', '/content/faq');
    cy.contains('Frequently asked questions').should('be.visible');
  });

  it('should open the products page', () => {
    cy.visit('/content/products');
    cy.contains('Products').should('be.visible');
    cy.contains('Visual Graph Programming').should('be.visible');
  });
});
