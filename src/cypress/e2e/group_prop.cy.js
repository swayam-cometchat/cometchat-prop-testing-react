const baseUrl = 'http://localhost:5173';

describe('CometChatGrop prop testing', () => {

    const waitForGroup = () => {
        cy.get('.cometchat-list-item', { timeout: 10000 }).should('exist');
    };
    beforeEach(() => {
        cy.wait(1000);
    });

    afterEach(() => {
        cy.wait(1000);
    });

    it('should hide search bar when hideSearch=true', () => {
        cy.visit(`${baseUrl}?hideSearch=true`);
        waitForGroup();

        cy.get('.cometchat-list-item').each(($item) => {
            const itemId = $item.attr('id');
            if (itemId && itemId.startsWith('group_')) {
                cy.wrap($item)
                    .find('.cometchat-list-item__status-icon')
                 
            }
        });
    });
    it('should show search bar when hideSearch=false', () => {
        cy.visit(`${baseUrl}?hideSearch=false`);
        waitForGroup();

        cy.get('.cometchat-list-item').each(($item) => {
            const itemId = $item.attr('id');
            if (itemId && itemId.startsWith('group_')) {
                cy.wrap($item)
                    .find('.cometchat-status-indicator.cometchat-list-item__status')
                    .should('exist');
            }
        });
    });



    it('should hide group type when hideGroupType=true', () => {
        cy.visit(`${baseUrl}?hideGroupType=true`);
       waitForGroup();

        cy.get('.cometchat-list-item').each(($item) => {
            const itemId = $item.attr('id');
            if (itemId && itemId.startsWith('group_')) {
                cy.wrap($item)
                    .find('.cometchat-status-indicator.cometchat-list-item__status')
                    .should('not.be.visible');
            }
        });
    });
    it('should show group type when hideGroupType=false', () => {
        cy.visit(`${baseUrl}?hideGroupType=false`,);
        waitForGroup();

        cy.get('.cometchat-list-item').each(($item) => {
            const itemId = $item.attr('id');
            if (itemId && itemId.startsWith('group_')) {
                cy.wrap($item)
                    .find('.cometchat-status-indicator.cometchat-list-item__status')
                    .should('exist');
            }
        });
    });



    it('should enable multiple selection mode', () => {
        cy.visit(`${baseUrl}?selectionMode=multiple`);
        waitForGroup();
        cy.get('.cometchat-checkbox__checkmark').should('exist').first().click();
        cy.get('.cometchat-checkbox__checkmark').should('exist').eq(4).click();
    });

    it('should enable single selection mode', () => {
        cy.visit(`${baseUrl}?selectionMode=single`);
        waitForGroup();
        cy.get('.cometchat-radiobutton__selected').should('exist').first().click();
    });

    it('should disable all selection options', () => {
        cy.visit(`${baseUrl}?selectionMode=none`);
        waitForGroup();
        cy.get('.cometchat-checkbox__checkmark').should('not.exist');
        cy.get('.cometchat-radiobutton__selected').should('not.exist');
    });

     it('should set the active group selected group', () => {
         const activeGuid = 'group_1735542773194';
         cy.visit(`${baseUrl}?chatGroup=${activeGuid}`);
         cy.wait(2000); 
         waitForGroup();   
      
     });
       

});
