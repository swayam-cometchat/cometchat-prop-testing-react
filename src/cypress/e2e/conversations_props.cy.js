const baseUrl = 'http://localhost:5173';

describe('CometChatConversations prop testing', () => {

    const waitForConversations = () => {
        cy.get('.cometchat-list-item', { timeout: 10000 }).should('exist');
    };
    beforeEach(() => {
        cy.wait(1000);
    });

    afterEach(() => {
        cy.wait(1000);
    });

      
   
    // it('should trigger custom option click (Nudge) and log message', () => {
    //     cy.visit(`${baseUrl}`);
    //     waitForConversations();
      
    //     // Spy on console.log
    //     cy.window().then((win) => {
    //       cy.spy(win.console, 'log').as('consoleLog');
    //     });
      
    //     // Hover over the first conversation item to reveal options
    //     cy.get('.cometchat-list-item').first().trigger('mouseover');
      
    //     // Wait for options to render
    //     cy.wait(1000);
      
    //     // Click the custom Nudge icon (assuming it's first in the menu)
    //     cy.contains('Nudge')  // Finds element with text
    //     .closest('.cometchat-menu-list__main-menu-item') // Adjust class as needed
    //     .find('.cometchat-menu-list__main-menu-item-icon') // Click the icon inside
    //     .click();
            
    //     // Assert the console log contains the onOptionClick message
    //     cy.get('@consoleLog').should('have.been.calledWithMatch', /^\[onOptionClick\]/);
    //   });


      
    it('should hide user status when hideUserStatus=true', () => {
        cy.visit(`${baseUrl}?hideUserStatus=true`);
        waitForConversations();

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
        cy.visit(`${baseUrl}?hideUserStatus=false`);
        waitForConversations();

        cy.get('.cometchat-list-item').each(($item) => {
            const itemId = $item.attr('id');
            if (itemId && itemId.startsWith('user_')) {
                cy.wrap($item)
                    .find('.cometchat-status-indicator.cometchat-list-item__status')
                    .should('exist');
            }
        });
    });



    it('should hide group type when hideGroupType=true', () => {
        cy.visit(`${baseUrl}?hideGroupType=true`);
        waitForConversations();

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
        cy.visit(`${baseUrl}?hideGroupType=false`);
        waitForConversations();

        cy.get('.cometchat-list-item').each(($item) => {
            const itemId = $item.attr('id');
            if (itemId && itemId.startsWith('group_')) {
                cy.wrap($item)
                    .find('.cometchat-status-indicator.cometchat-list-item__status')
                    .should('exist');
            }
        });
    });




    it('should hide receipts when hideReceipts=true', () => {
        cy.visit(`${baseUrl}?hideReceipts=true`);
        waitForConversations();
        cy.get('.cometchat-receipts').should('not.exist');
    });

    it('should show receipts when hideReceipts=false', () => {
        cy.visit(`${baseUrl}?hideReceipts=false`);
        waitForConversations();
        cy.get('.cometchat-receipts').should('exist');
    });
    it('should enable multiple selection mode', () => {
        cy.visit(`${baseUrl}?selectionMode=multiple`);
        waitForConversations();
        cy.get('.cometchat-checkbox__checkmark').should('exist').first().click();
        cy.get('.cometchat-checkbox__checkmark').should('exist').eq(1).click();
    });

    it('should enable single selection mode', () => {
        cy.visit(`${baseUrl}?selectionMode=single`);
        waitForConversations();
        cy.get('.cometchat-radiobutton__selected').should('exist').first().click();
    });

    it('should disable all selection options', () => {
        cy.visit(`${baseUrl}?selectionMode=none`);
        waitForConversations();
        cy.get('.cometchat-checkbox__checkmark').should('not.exist');
        cy.get('.cometchat-radiobutton__selected').should('not.exist');
    });


    it('should hide delete option when hideDeleteConversation=true', () => {
        cy.visit(`${baseUrl}?hideDeleteConversation=true`);
        waitForConversations();
        cy.get('.cometchat-list-item').first().trigger('mouseover');
        cy.wait(2000);
        cy.get('.cometchat-menu-list__main-menu-item-icon-delete').should('not.exist');
    });


    it('should not hide delete option when hideDeleteConversation=false', () => {
        cy.visit(`${baseUrl}?hideDeleteConversation=false`);
        waitForConversations();
        cy.get('.cometchat-list-item').first().trigger('mouseover');
        cy.wait(2000);
        cy.get('.cometchat-menu-list__main-menu-item-icon-delete').should('exist');
    });

    it('should render only 5 conversation list items with setLimit(5)', () => {
        cy.visit(`${baseUrl}?limit=5`);
        cy.get('.cometchat-list-item', { timeout: 10000 })
            .should('have.length', 5);
    });

    it('should display last message time in "DD MMM, hh:mm A" format', () => {
        cy.visit(`${baseUrl}?customDateFormat=true`);
        cy.get('.cometchat-list-item', { timeout: 10000 }).should('exist');

        cy.get('.cometchat-date').each(($el) => {
            const timeText = $el.text();
            const regex = /^\d{2} [A-Za-z]{3}, \d{2}:\d{2} [APap][Mm]$/;
            expect(timeText.trim()).to.match(regex);
        });
    });
    it('should set the active conversation based on query param', () => {
        const activeUid = 'cometchat-uid-2';
      
        cy.visit(`${baseUrl}?conversationWith=${activeUid}&conversationType=user`);
        waitForConversations();
      
        cy.get('.cometchat-conversations__list-item-active .cometchat-list-item')
        .should('have.css', 'background-color', 'rgb(232, 232, 232)');
    });

    it('should trigger onItemClick when a conversation is clicked', () => {
        cy.visit(`${baseUrl}`);
        waitForConversations();
      
        cy.window().then((win) => {
          cy.spy(win.console, 'log').as('consoleLog');
        });
      
        cy.get('.cometchat-list-item')
          .first()
          .click();
      
        cy.get('@consoleLog').should('have.been.calledWithMatch', /^\[onItemClick\]/);
    });
      

    

      

});
