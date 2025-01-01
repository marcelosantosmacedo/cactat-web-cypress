/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

    beforeEach(() => {
        cy.visit('./src/index.html')
    })


    it('EP 01 - Seleciona um produto (YouTube) por seu texto', function() {
       
        cy.get('select').select('YouTube')
            .should('have.value', 'youtube')
  
    })

    it('EE 01 - Seleciona um produto (Mentoria) por seu valor (value)', function() {
       
        cy.get('select').select('mentoria')
            .should('have.value', 'mentoria')
  
    })

    it('EE 02 - Seleciona um produto (Blog) por seu índice', function() {
       
        cy.get('select').select(1)
            .should('have.value', 'blog')
  
    })



})