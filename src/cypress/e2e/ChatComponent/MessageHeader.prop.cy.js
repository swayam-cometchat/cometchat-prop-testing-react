const baseUrl = 'http://localhost:5173'; // Change if needed

describe('User and Group selection opens chat', () => {
  beforeEach(() => {
    cy.visit(baseUrl);
    cy.wait(2000); // wait for CometChat to load
  });

  it('should open chat when a user is clicked', () => {
    cy.get('.cometchat-list-item') // list items are users
      .first()
      .click();

    // Expect Chat area to contain text like "Chat with:"
    cy.contains('Chat with:').should('exist');
  });

  it('should open chat when a group is clicked', () => {
    // Navigate to group list (if in a tab/panel)
    cy.get('.cometchat-tabs__item') // assuming group tab exists
      .contains('Groups')
      .click();

    cy.get('.cometchat-list-item') // group list items
      .first()
      .click();

    cy.contains('Chat with:').should('exist');
  });
});
