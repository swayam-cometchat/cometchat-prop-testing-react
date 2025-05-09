const baseUrl = 'http://localhost:5173';

describe('MessageHeader component: MessageHeader prop testing', () => {  

  beforeEach(() => {
    cy.visit(`${baseUrl}?component=messageHeader`, { failOnStatusCode: false });
  });

  afterEach(() => {
    cy.wait(3000);
  });

 
  it('should hide user status when hideUserStatus=true', () => {
    cy.visit(`${baseUrl}?component=messageHeader&hideUserStatus=true`);
    cy.wait(2000);

    cy.get('.cometchat-list-item').each(($item) => {
        const itemId = $item.attr('id');
        if (itemId && itemId.startsWith('user_')) {
            cy.wrap($item)
                .find('.cometchat-list-item__status-icon')
                .should('not.be.visible');
        }
    });
});


it('should show group type when hideUserStatus=false', () => {
    cy.visit(`${baseUrl}?component=messageHeader&hideUserStatus=false`);
  

    cy.get('.cometchat-list-item').each(($item) => {
        const itemId = $item.attr('id');
        if (itemId && itemId.startsWith('user_')) {
            cy.wrap($item)
                .find('.cometchat-status-indicator.cometchat-list-item__status')
                .should('exist');
        }
    });
});


  
  it('should hide receipts when showConversationSummaryButton=true', () => {
    cy.visit(`${baseUrl}?component=messageHeader&showConversationSummaryButton=true`);
    cy.wait(2000);
    cy.get('.cometchat-message-header__conversation-summary-button > .cometchat > .cometchat-button > .cometchat-button__icon-default').should('exist');
  });
  
  it('should hide receipts when showConversationSummaryButton=false', () => {
    cy.visit(`${baseUrl}?component=messageHeader&showConversationSummaryButton=false`)
    cy.get('.cometchat-message-header__conversation-summary-button > .cometchat > .cometchat-button > .cometchat-button__icon-default').should('not.exist');
    cy.wait(2000);
  });
});
