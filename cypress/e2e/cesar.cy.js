/// <reference types="cypress" />

describe('cesar app', () => {
    beforeEach(() => {
        cy.visit('../../pages/cesar/cesar.html')
    })

    it('has a <h1> with Caesar Cypher', () => {
        cy.get('h1')
            .should('have.text', 'Caesar Cypher')
    })

    it('can update the cypher key', () => {
        const cypherKey = 1
        const cesarText = 'Hello World!'
        const cesarResult = 'Ifmmp Xpsme!'

        cy.get('input')
            .clear()
            .type(cypherKey)
        cy.get('textarea')
            .clear()
            .type(cesarText)
        cy.get('button')
            .click()
        cy.get('#result')
            .should('have.text', cesarResult)
    })

})