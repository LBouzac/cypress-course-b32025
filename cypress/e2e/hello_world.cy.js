/// <reference types="cypress" />

describe('example hello_world app', () => {
  beforeEach(() => {
      cy.visit('../../pages/hello_world.html')
  })

    it('have a <p> with hello world!', () => {
        cy.get('p')
            .should('have.text', 'Hello World!')
    });
})
