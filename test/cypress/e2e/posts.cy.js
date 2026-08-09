describe('Posts Section', () => {
    it('should load the Posts page', () => {
        cy.visit('/content/posts');
        cy.get('main').should('exist');
        cy.url().should('include', '/content/posts');
    });
});
