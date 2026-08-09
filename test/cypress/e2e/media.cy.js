describe('Media Section', () => {
    it('should load the Media page', () => {
        cy.visit('/content/media');
        cy.get('main').should('exist');
        cy.url().should('include', '/content/media');
    });
});
