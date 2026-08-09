describe('Tools Section', () => {
    it('should load the Tools page', () => {
        cy.visit('http://localhost:3000/Organization-Website/content/tools');
        cy.get('main').should('exist');
        cy.url().should('include', '/content/tools');
    });
});
