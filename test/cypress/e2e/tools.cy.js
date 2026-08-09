describe('Tools Section', () => {
    it('should load the Tools page', () => {
        cy.visit('/content/tools');
        cy.get('main').should('exist');
        cy.url().should('include', '/content/tools');
    });
});
