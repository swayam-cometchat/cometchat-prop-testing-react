const { CometChatGroups } = require("@cometchat/chat-uikit-react");

const baseUrl = 'http://localhost:5173/';

const waitForGroupMembers = () => {
  cy.get('.cometchat-group-members__list-item ', { timeout: 10000 }).should('exist');
};

describe('CometChatGroupMembers props testing', () => {

  beforeEach(() => {
    cy.wait(2000);
  });

  afterEach(() => {
    cy.wait(1000);
  });


  it('should load and display group members', () => {
    cy.visit(`${baseUrl}`);

    cy.get('.cometchat-list__body',{ timeout: 10000 })
      .should('exist')
      .and('not.be.empty');

  });
     
  it('should hide search-bar with hideSearch=true', () => {
    cy.visit(`${baseUrl}?hideSearch=true`);
    waitForGroupMembers();
    cy.get('.cometchat-group-members__list-item ').each(($item) => {
        const itemId = $item.attr('id');
        if (itemId && itemId.startsWith('cometchat')) {
          cy.wrap($item)
            .find('.cometchat-search-bar')
            .should('not.be.visible');
        }
  })
  });


  it('should show search-bar with hideSearch=false', () => {
    cy.visit(`${baseUrl}?hideSearch=false`);
    waitForGroupMembers();
    cy.get('.cometchat-group-members__list-item ').each(($item) => {
        const itemId = $item.attr('id');
        if (itemId && itemId.startsWith('cometchat')) {
          cy.wrap($item)
            .find('.cometchat-search-bar')
            .should('be.visible');
        }
  })
});


it('should show hideKickMemberOption with hideKickMemberOption=true', () => {
  cy.visit(`${baseUrl}?hideKickMemberOption=true`);
  waitForGroupMembers();
    cy.get(".cometchat-list-item__body").first().trigger('mouseover') 
.log('Triggered mouseover on user');
cy.wait(2000);
cy.get('.cometchat-menu-list__sub-menu-icon').click();
cy.get('#kick > .cometchat-menu-list__sub-menu-list-item').should('not.exist').log("Verified that the 'kick' option does not exist");

});




  it('should show hideKickMemberOption with hideKickMemberOption=false', () => {
    cy.visit(`${baseUrl}?hideKickMemberOption=false`);
    waitForGroupMembers();
      cy.get(".cometchat-list-item__body").first().trigger('mouseover') 
  .log('Triggered mouseover on user');
  cy.wait(2000);
  cy.get('.cometchat-menu-list__sub-menu-icon').click();
  cy.get('#kick > .cometchat-menu-list__sub-menu-list-item').should('exist').log("Verified that the 'kick' option does exist");
  
});




it('should hide Ban Member Option with hideBanMemberOption=true', () => {
  cy.visit(`${baseUrl}?hideBanMemberOption=true`);
  waitForGroupMembers()
  cy.get(".cometchat-list-item__body").first().trigger('mouseover') 
  .log('Triggered mouseover on user');
  cy.wait(2000);
  cy.get('.cometchat-menu-list__sub-menu-icon').first().click();
  cy.get('#ban > .cometchat-menu-list__sub-menu-list-item').should('not.exist').log("Verified that the 'ban' option does not exist");
  });


  it('should show Ban Member Option with hideBanMemberOption=false', () => {
    cy.visit(`${baseUrl}?hideBanMemberOption=false`);
    waitForGroupMembers();
    cy.get(".cometchat-list-item__body").first().trigger('mouseover') 
    .log('Triggered mouseover on user');
    cy.wait(2000);
    cy.get('.cometchat-menu-list__sub-menu-icon').first().click();
    cy.get('#ban > .cometchat-menu-list__sub-menu-list-item').should('exist').log("Verified that the 'ban' option does exist");
    });
  


  it('should hide Scope Change Option with hideScopeChangeOption=true', () => {
    cy.visit(`${baseUrl}?hideScopeChangeOption=true`);
    waitForGroupMembers();
    cy.get(".cometchat-list-item__body").first().trigger('mouseover') 
    .log('Triggered mouseover on user');
    cy.wait(2000);
    cy.get('.cometchat-menu-list__sub-menu-icon').first().click();
    cy.get('#changeScope >.cometchat-menu-list__sub-menu-list-item').should('not.exist').log("Verified that the 'changeScope' option does not exist");
    });


    it('should show Scope Change Option with hideScopeChangeOption=false', () => {
      cy.visit(`${baseUrl}?hideScopeChangeOption=false`);
      waitForGroupMembers();
      cy.get(".cometchat-list-item__body").first().trigger('mouseover') 
      .log('Triggered mouseover on user');
      cy.wait(2000);
      cy.get('.cometchat-menu-list__sub-menu-icon').first().click();
      cy.get('#changeScope >.cometchat-menu-list__sub-menu-list-item').should('exist').log("Verified that the 'changeScope' option does exist");
      });
  

    it('should hide users status when hideUserStatus=true', () => {
      cy.visit(`${baseUrl}?hideUserStatus=true`);
      waitForGroupMembers();
  
      cy.get('.cometchat-list-item').each(($item) => {
        const itemId = $item.attr('id');
        if (itemId && itemId.startsWith('cometchat')) {
          cy.wrap($item)
          cy.get('.cometchat-list-item__leading-view > .cometchat-status-indicator')
            .should('not.be.visible');
        }
      });
    });


    it('should show users status when hideUserStatus=false', () => {
      cy.visit(`${baseUrl}?hideUserStatus=false`);
      waitForGroupMembers();
  
      cy.get('.cometchat-list-item').each(($item) => {
        const itemId = $item.attr('id');
        if (itemId && itemId.startsWith('cometchat')) {
          cy.wrap($item)
          cy.get('.cometchat-list-item__leading-view > .cometchat-status-indicator')
            .should('be.visible');
        }
      });
    });


    it('should enable the searchKeyword with searchKeyword=admin', () =>{
      cy.visit(`${baseUrl}`);
      cy.wait(2000);
      cy.get('.cometchat-search-bar__input').type("admin").log("Typed admin in the search bar");
      cy.get('.cometchat-search-bar__input').clear().log("Cleared the search bar input");
      cy.get('.cometchat-search-bar__input').should("be.visible").log("Verified the search bar is visible after clearing");
    });


    it('should enable single selection mode', () => {
      cy.visit(`${baseUrl}?selectionMode=single`);
      waitForGroupMembers();
      cy.get('.cometchat-radiobutton__selected').should('exist').last().click();
  });

  
  it('should disable all selection options', () => {
      cy.visit(`${baseUrl}?selectionMode=none`);
      waitForGroupMembers();
      cy.get('.cometchat-checkbox__checkmark').should('not.exist');
      cy.get('.cometchat-radiobutton__selected').should('not.exist');
  });
  
      it('should enable multiple selection mode', () => {
        cy.visit(`${baseUrl}?selectionMode=multiple`);
         waitForGroupMembers();
        cy.get('.cometchat-checkbox__checkmark').should('exist').first().click();
        const indexeToSelect = [2, 3, 4];
        indexeToSelect.forEach(index => {
          cy.get('.cometchat-checkbox__checkmark').eq(index).click();
        });
    });



  
 });
  



