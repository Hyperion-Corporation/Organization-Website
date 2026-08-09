describe('Reports Section', () => {
    it('should load the Reports page', () => {
        cy.visit('http://localhost:3000/Organization-Website/content/reports');
        cy.get('main').should('exist');
        cy.url().should('include', '/content/reports');
    });
});
