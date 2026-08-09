describe('Projects Section', () => {
    it('should load the Projects page', () => {
        cy.visit('/content/projects');
        cy.get('main').should('exist');
        cy.url().should('include', '/content/projects');
    });
});
