describe('Posts Section', () => {
    it('should load the Posts page', () => {
        cy.visit('http://localhost:3000/Organization-Website/content/posts');
        cy.get('main').should('exist');
        cy.url().should('include', '/content/posts');
    });
});
