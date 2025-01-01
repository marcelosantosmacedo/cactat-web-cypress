/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

    beforeEach(() => {
        cy.visit('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
    })


    it('EP 01 - Marca ambos checkboxes, depois desmarca o último', function() {
       
        cy.get("input[type='checkbox']")
          .check()
          .last()
          .uncheck()
          .should('not.be.checked')
  
    })

    it('EE 01 - Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        const longText = 'Texto descritivo de teste, Texto descritivo de teste'

        cy.get("input[id='firstName']").type('Marcelo')
        cy.get("input[id='lastName']").type('Macedo')
        cy.get("input[id='email']").type('marcelo.macedo@teste.com')
        cy.get("textarea[id='open-text-area']").type(longText)

        cy.get("input[id='phone-checkbox']").check()

        cy.get("button[type='submit']").click()

        cy.get("span[class='error']")
        .should('be.visible')
        .contains('Valide os campos obrigatórios!')
     })

})