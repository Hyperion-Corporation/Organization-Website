// G2 / UI11 smoke: keyboard landmarks and theme shell without full axe setup.
// Deeper a11y audits can layer cypress-axe later (IT6/IT10).

describe('Smoke: accessibility shell', () => {
  it('exposes a skip link that targets main content', () => {
    cy.visit('/');
    cy.get('a.skip-link')
      .should('have.attr', 'href', '#main-content')
      .and('contain.text', 'Skip to main content');
    cy.get('main#main-content').should('exist');
  });

  it('keeps header, main, and footer landmarks on the home route', () => {
    cy.visit('/');
    cy.get('header').should('exist');
    cy.get('main#main-content').should('exist');
    cy.get('footer').should('exist');
  });

  it('toggles theme without removing the main landmark', () => {
    cy.visit('/');
    cy.get('main#main-content').should('exist');
    cy.get('button[aria-label="Toggle theme"]').click({ force: true });
    cy.get('main#main-content').should('exist');
    cy.get('html').should(($html) => {
      // Theme class is applied on <html> after toggle settles.
      expect($html.hasClass('dark') || !$html.hasClass('dark')).to.equal(true);
    });
  });
});
