describe('Reports Section', () => {
    it('should load the Reports page', () => {
        cy.visit('/content/reports');
        cy.get('main').should('exist');
        cy.url().should('include', '/content/reports');
    });
});
