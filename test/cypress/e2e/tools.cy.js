describe('Tools redirect', () => {
  it('redirects the retired tools route to products', () => {
    cy.visit('/content/tools');
    cy.url().should('include', '/content/products');
    cy.contains(/Products|Visual Graph Programming/i).should('be.visible');
  });
});
