

const baseUrl = 'http://localhost:5173/';

const waitForGroups = () => {
  cy.get('.cometchat-list-item', { timeout: 10000 }).should('exist');
};

describe('CometChatGroups prop testing', () => {

  beforeEach(() => {
    cy.wait(2000);
  });

  afterEach(() => {
    cy.wait(1000);
  });

  it('should hide group Search-Bar when hideSearch=true', () => {
    cy.visit(`${baseUrl}?hideSearch=true`);
    waitForGroups();

    cy.get('.cometchat-list-item').each(($item) => {
      const itemId = $item.attr('id');
      if (itemId && itemId.startsWith('#ab_')) {
        cy.wrap($item)
          .find('.cometchat-status-indicator.cometchat-list-item__search-Bar')
          .should('not.be.visible');
      }
    });
  });

  it('should hide group Search-Bar when hideSearch=false', () => {
    cy.visit(`${baseUrl}?hideSearch=false`);
    waitForGroups();

    cy.get('.cometchat-list-item').each(($item) => {
      const itemId = $item.attr('id');
      if (itemId && itemId.startsWith('#ab_')) {
        cy.wrap($item)
          .find('.cometchat-status-indicator.cometchat-list-item__search-Bar')
          .should('exist');
      }
    });
  });

  it('should hide group type when hideGroupType=true', () => {
    cy.visit(`${baseUrl}?hideGroupType=true`);
    waitForGroups();

    cy.get('.cometchat-list-item').each(($item) => {
      const itemId = $item.attr('id');
      if (itemId && itemId.startsWith('#ab_')) {
        cy.wrap($item)
          .find('.cometchat-status-indicator.cometchat-list-item__status')
          .should('not.be.visible');
      }
    });
  });
   
  it('should show the group type when hideGroupType=false', () =>  {
    cy.visit(`${baseUrl}?hideGroupType=false`);
    waitForGroups;

    cy.get('.cometchat-list-item').each(($item) => {
      const itemId = $item.attr('id');
      if (itemId && itemId.startsWith('#ab_')) {
        cy.wrap($item)
          .find('.cometchat-status-indicator.cometchat-list-item__status')
          .should('exist');
      }
    });
  });


    it('should set the active group with 	activeGroup={chatGroup}', () => {
      const activeGuid = 'cometchat-guid-1';
      cy.visit(`${baseUrl}?chatGroup=${activeGuid}`);
      cy.wait(2000); 
      waitForGroups();
      });

  it('should enable single selection mode', () => {
    cy.visit(`${baseUrl}?selectionMode=single`);
    waitForGroups();
    cy.get('.cometchat-radiobutton__selected').should('exist').first().click();
});

it('should disable all selection options', () => {
    cy.visit(`${baseUrl}?selectionMode=none`);
    waitForGroups();
    cy.get('.cometchat-checkbox__checkmark').should('not.exist');
    cy.get('.cometchat-radiobutton__selected').should('not.exist');
});

    it('should enable multiple selection mode', () => {
      cy.visit(`${baseUrl}?selectionMode=multiple`);
       waitForGroups();
      cy.get('.cometchat-checkbox__checkmark').should('exist').first().click();
      cy.get('.cometchat-checkbox__checkmark').should('exist').eq(4).click();
  });



});
  
