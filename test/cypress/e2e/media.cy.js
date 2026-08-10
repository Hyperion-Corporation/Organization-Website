describe('Media redirect', () => {
  it('redirects the retired media route to press kit', () => {
    cy.visit('/content/media');
    cy.url().should('include', '/content/press');
    cy.contains(/Press kit|boilerplate/i).should('be.visible');
  });
});
