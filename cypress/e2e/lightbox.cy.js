// cypress/e2e/lightbox.cy.js

// cypress/e2e/lightbox.cy.js

describe('Lightbox', () => {
    beforeEach(() => {
        cy.visit('/../../pages/lightbox/lightbox.html'); // Adapter le chemin selon votre projet
    });

    it('ouvre la lightbox au clic sur l\'image', () => {
        cy.get('[data-cy=image]').click();
        cy.get('[data-cy=lightbox]').should('be.visible');
    });

    it('ferme la lightbox au clic en dehors', () => {
        cy.get('[data-cy=image]').click();
        cy.get('[data-cy=lightbox-overlay]').click('topLeft');
        cy.get('[data-cy=lightbox]').should('not.exist');
    });

    it('ajoute un "j\'aime" et met à jour les compteurs', () => {
        cy.get('[data-cy=like-btn]').click();
        cy.get('[data-cy=like-count-overlay]').should('contain', '1');
        cy.get('[data-cy=image]').click();
        cy.get('[data-cy=like-count-lightbox]').should('contain', '1');
    });

    it('supprime un "j\'aime" et met à jour les compteurs', () => {
        cy.get('[data-cy=like-btn]').click();
        cy.get('[data-cy=like-btn]').click();
        cy.get('[data-cy=like-count-overlay]').should('contain', '0');
        cy.get('[data-cy=image]').click();
        cy.get('[data-cy=like-count-lightbox]').should('contain', '0');
    });

    it('ajoute un commentaire', () => {
        cy.get('[data-cy=image]').click();
        cy.get('[data-cy=comment-input]').type('Cypress is awesome!');
        cy.get('[data-cy=publish-btn]').click();
        cy.get('[data-cy=comment-list]').should('contain', 'Cypress is awesome!');
    });

    it('empêche l\'ajout d\'un commentaire vide', () => {
        cy.get('[data-cy=image]').click();
        cy.get('[data-cy=comment-input]').clear();
        cy.get('[data-cy=publish-btn]').should('be.disabled');
    });

    it('cache les commentaires', () => {
        cy.get('[data-cy=image]').click();
        cy.get('[data-cy=toggle-comments]').click();
        cy.get('[data-cy=comment-list]').should('not.be.visible');
    });

    it('vérifie les compteurs de commentaires', () => {
        cy.get('[data-cy=image]').click();
        cy.get('[data-cy=comment-input]').type('Test 1');
        cy.get('[data-cy=publish-btn]').click();
        cy.get('[data-cy=comment-count-overlay]').should('contain', '1');
        cy.get('[data-cy=comment-count-lightbox]').should('contain', '1');
    });

    it('gère le singulier/pluriel des commentaires', () => {
        cy.get('[data-cy=image]').click();
        cy.get('[data-cy=comment-input]').type('Premier');
        cy.get('[data-cy=publish-btn]').click();
        cy.get('[data-cy=comment-count-lightbox]').should('contain', '1 commentaire');
        cy.get('[data-cy=comment-input]').type('Second');
        cy.get('[data-cy=publish-btn]').click();
        cy.get('[data-cy=comment-count-lightbox]').should('contain', '2 commentaires');
    });

    it('supprime le second commentaire', () => {
        cy.get('[data-cy=image]').click();
        cy.get('[data-cy=comment-input]').type('A');
        cy.get('[data-cy=publish-btn]').click();
        cy.get('[data-cy=comment-input]').type('B');
        cy.get('[data-cy=publish-btn]').click();
        cy.get('[data-cy=comment-input]').type('C');
        cy.get('[data-cy=publish-btn]').click();
        cy.get('[data-cy=comment-list] [data-cy=delete-comment]').eq(1).click();
        cy.get('[data-cy=comment-list]').should('not.contain', 'B');
    });
});