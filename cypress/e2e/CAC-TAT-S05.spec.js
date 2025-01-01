/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

    beforeEach(() => {
        cy.visit('./src/index.html')
    })


    it('EP 01 - Seleciona um arquivo da pasta fixtures', function() {
       
        cy.get("input[id='file-upload']")
          .should('not.have.value')  
          .selectFile('./cypress/fixtures/example.json')
          .should(function($input) {
            expect($input [0].files[0].name).to.equal('example.json')
          })
  
    })

    it('EE 01 - seleciona um arquivo simulando um drag-and-drop', function() {
       
        cy.get("input[id='file-upload']")
          .should('not.have.value')  
          .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
          .should(function($input) {
            expect($input [0].files[0].name).to.equal('example.json')
          })
  
    })

    it('EE 02 - Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
       
        cy.fixture('example.json').as('sampleFile')
        cy.get("input[id='file-upload']")
          .selectFile('@sampleFile')
          .should(function($input) {
            expect($input [0].files[0].name).to.equal('example.json')
          })
  
    })

})