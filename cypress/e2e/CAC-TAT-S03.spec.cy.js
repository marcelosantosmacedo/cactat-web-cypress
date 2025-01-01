/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

    beforeEach(() => {
        cy.visit('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
    })


    it('EP 01 - marca o tipo de atendimento "Feedback"', function() {
       
        cy.get("input[value='feedback']").check()
            .should('be.checked')
            .should('have.value', 'feedback')
  
    })

    it('EE 01 - Marca cada tipo de atendimento', function() {
       
        cy.get("input[type='radio'][value='ajuda']").check()
            .should('be.checked')

        cy.get("input[type='radio'][value='elogio']").check()
            .should('be.checked')
        
        cy.get("input[type='radio'][value='feedback']").check()
            .should('be.checked')
  
    })

    it('EE 01 - Marca cada tipo de atendimento - Refatorado', function() {
       
        cy.get("input[type='radio']")
            .should('have.length', 3)
            .each(function($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
  
    })

})