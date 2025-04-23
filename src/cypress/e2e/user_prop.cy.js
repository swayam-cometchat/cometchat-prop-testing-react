const baseUrl = 'http://localhost:5173';

const waitForUsers = () => {
  cy.get('.cometchat-list-item', { timeout: 10000 }).should('exist');
};

describe('user component: User prop testing', () => {  

  beforeEach(() => {
    cy.wait(2000);
  });

  afterEach(() => {
    cy.wait(1000);
  });

  it('should hide user status when hideUserStatus=true', () => {
    cy.visit(`${baseUrl}?hideUserStatus=true`);
    waitForUsers();

    cy.get('.cometchat-list-item').each(($item) => {
      const itemId = $item.attr('id');
      if (itemId && itemId.startsWith('user_')) {
        cy.wrap($item)
          .find('.cometchat-list-item__status-icon')
          .should('not.be.visible');
      }
    });
  });

  it('should show user status when hideUserStatus=false', () => {
    cy.visit(`${baseUrl}?hideUserStatus=false`);
    waitForUsers();

    cy.get('.cometchat-list-item').each(($item) => {
      const itemId = $item.attr('id');
      if (itemId && itemId.startsWith('user_')) {
        cy.wrap($item)
          .find('.cometchat-status-indicator.cometchat-list-item__status')
          .should('exist');
      }
    });
  });

  it('should hide user Search-Bar when hideSearch=true', () => {
    cy.visit(`${baseUrl}?hideSearch=true`);
    waitForUsers();

    cy.get('.cometchat-list-item').each(($item) => {
      const itemId = $item.attr('id');
      if (itemId && itemId.startsWith('user_')) {
        cy.wrap($item)
          .find('.cometchat-status-indicator.cometchat-list-item__search-Bar')
          .should('not.be.visible');
      }
    });
  });

  it('should show user search-bar when hideSearch=false', () => {
    cy.visit(`${baseUrl}?hideSearch=fasle`);
    waitForUsers();

    cy.get('.cometchat-list-item').each(($item) => {
      const itemId = $item.attr('id');
      if (itemId && itemId.startsWith('user_')) {
        cy.wrap($item)
          .find('.cometchat-status-indicator.cometchat-list-item__search-Bar')
          .should('exist');
      }
    });
  });

  it('should enable multiple selection mode', () => {
    cy.visit(`${baseUrl}?selectionMode=multiple`);
    waitForUsers();
    cy.get('.cometchat-checkbox__checkmark').should('exist').last().click();
    cy.get('.cometchat-checkbox__checkmark').should('exist').first().click();
  });

  it('should enable single selection mode', () => {
    cy.visit(`${baseUrl}?selectionMode=single`);
    waitForUsers();
    cy.get('.cometchat-radiobutton__selected').should('exist').eq(3).click();
  });

  it('should disable all selection options', () => {
    cy.visit(`${baseUrl}?selectionMode=none`);
    waitForUsers();
    cy.get('.cometchat-checkbox__checkmark').should('not.exist');
    cy.get('.cometchat-radiobutton__selected').should('not.exist');
  });
});

 
  it('should log something when a user is clicked', () => {
  cy.visit(`${baseUrl}`);

  cy.window().then((win) => {
    cy.spy(win.console, 'log').as('consoleLog');
  });

  cy.get('.cometchat-list-item').first().click();


  cy.get('@consoleLog').then((spy) => {
    const calls = spy.getCalls();
    calls.forEach((call) => {
      cy.log(`Console Log: ${call.args.join(' ')}`);
    });
  });
});

it('should set the active user based on query param', () => {
  const activeUid = 'cometchat-uid-2';
  cy.visit(`${baseUrl}?chatUser=${activeUid}`);
  cy.wait(2000); 
  waitForUsers();


});


