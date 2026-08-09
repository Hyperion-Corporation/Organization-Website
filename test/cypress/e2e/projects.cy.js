describe('Projects Section', () => {
    it('should load the Projects page', () => {
        cy.visit('http://localhost:3000/Organization-Website/content/projects');
        cy.get('main').should('exist');
        cy.url().should('include', '/content/projects');
    });
});
