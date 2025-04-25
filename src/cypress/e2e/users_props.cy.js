
const baseUrl = 'http://localhost:5173/';

const waitForUsers = () => {
  cy.get('.cometchat-list-item', { timeout: 10000 }).should('exist');
};

describe('CometChatUsers prop testing', () => {

  beforeEach(() => {
    cy.wait(2000);
  });

  afterEach(() => {
    cy.wait(1000);
  });

  it('should hide users Search-Bar when hideSearch=true', () => {
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

  it('should show users Search-Bar when hideSearch=false', () => {
    cy.visit(`${baseUrl}?hideSearch=false`);
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

  it('should hide users status when hideUserStatus=true', () => {
    cy.visit(`${baseUrl}?hideUserStatus=true`);
    waitForUsers();

    cy.get('.cometchat-list-item').each(($item) => {
      const itemId = $item.attr('id');
      if (itemId && itemId.startsWith('user_')) {
        cy.wrap($item)
          .find('.cometchat-status-indicator.cometchat-list-item__status')
          .should('not.be.visible');
      }
    });
  });
   
  it('should show the user type when hideUserStatus=false', () =>  {
    cy.visit(`${baseUrl}?hideUserStatus=false`);
    waitForUsers;

    cy.get('.cometchat-list-item').each(($item) => {
      const itemId = $item.attr('id');
      if (itemId && itemId.startsWith('#user_')) {
        cy.wrap($item)
          .find('.cometchat-status-indicator.cometchat-list-item__status')
          .should('exist');
      }
    });
  });


    it('should set the active user with activeUser={chatUser}', () => {
      const activeUid = 'cometchat-uid-3';
      cy.visit(`${baseUrl}?chatUser=${activeUid}`);
      cy.wait(2000); 
      waitForUsers();
      });

  it('should enable single selection mode', () => {
    cy.visit(`${baseUrl}?selectionMode=single`);
    waitForUsers();
    cy.get('.cometchat-radiobutton__selected').should('exist').first().click();
});

it('should disable all selection options', () => {
    cy.visit(`${baseUrl}?selectionMode=none`);
    waitForUsers();
    cy.get('.cometchat-checkbox__checkmark').should('not.exist');
    cy.get('.cometchat-radiobutton__selected').should('not.exist');
});

    it('should enable multiple selection mode', () => {
      cy.visit(`${baseUrl}?selectionMode=multiple`);
       waitForUsers();
      cy.get('.cometchat-checkbox__checkmark').should('exist').first().click();
      const indexeToSelect = [1, 2, 3];
      indexeToSelect.forEach(index => {
        cy.get('.cometchat-checkbox__checkmark').eq(index).click();
      });
  });

   it ('should hide sectionHeader with showSectionHeader=false', () =>{
    cy.visit(`${baseUrl}?showSectionHeader=false`);
    waitForUsers();
    cy.get('.cometchat-list__section > .cometchat-list__section-header').should("not.exist");

  });

  it ('should enable sectionHeader with showSectionHeader=true', () =>{
    cy.visit(`${baseUrl}?showSectionHeader=true`);
    waitForUsers();
    cy.get('.cometchat-list__section > .cometchat-list__section-header').should("exist");

  });

 

  it('should enable the searchKeyword with searchKeyword=Alice', () =>{
    cy.visit(`${baseUrl}`);
    cy.wait(2000);
    cy.get('.cometchat-users > [style="width: 100%; height: 100%;"] > .cometchat-list > .cometchat-list__header > .cometchat-list__header-search-bar > .cometchat > .cometchat-search-bar').type("Alice");
    cy.get('.cometchat-users__empty-state-view').should("be.visible");
    cy.get('.cometchat-users > [style="width: 100%; height: 100%;"] > .cometchat-list > .cometchat-list__header > .cometchat-list__header-search-bar > .cometchat > .cometchat-search-bar > .cometchat-search-bar__input').clear();
    cy.get('.cometchat-users > [style="width: 100%; height: 100%;"] > .cometchat-list > .cometchat-list__body').should("be.visible");
  });





});
  
