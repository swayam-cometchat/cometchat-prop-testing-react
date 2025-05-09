const baseUrl = 'http://localhost:5173';

describe('Master Component Test Suite', () => {

  it('MessageHeader component', () => {
    cy.visit(`${baseUrl}?component=messageHeader&hideUserStatus=true`);
    cy.get('.cometchat-list-item').each(($item) => {
      const itemId = $item.attr('id');
      if (itemId && itemId.startsWith('user_')) {
        cy.wrap($item)
          .find('.cometchat-list-item__status-icon')
          .should('not.be.visible');
      }
    });
  });

  it('Conversations component', () => {
    cy.visit(`${baseUrl}?component=conversations`);
    cy.get('.cometchat-conversation-list').should('exist');
  });

  it('Users component', () => {
    cy.visit(`${baseUrl}?component=users`);
    cy.get('.cometchat-user-list').should('exist');
  });

  it('Groups component', () => {
    cy.visit(`${baseUrl}?component=groups`);
    cy.get('.cometchat-group-list').should('exist');
  });

});
