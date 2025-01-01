/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

    beforeEach(() => {
        cy.visit('./src/index.html')
    })


    it('EP 01 - Verifica o título da aplicação', function() {
       
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
  
    })

    it('EE 01 - Preenche os campos obrigatórios e envia o formulário', function() {
       const longText = 'Texto descritivo de teste, Texto descritivo de teste'

        cy.get("input[id='firstName']").type('Marcelo')
        cy.get("input[id='lastName']").type('Macedo')
        cy.get("input[id='email']").type('marcelo.macedo@teste.com')
        cy.get("textarea[id='open-text-area']").type(longText, {delay: 20})

        cy.get("button[type='submit']").click()

        cy.get("span[class='success']")
        .should('be.visible')
        .contains('Mensagem enviada com sucesso')
    })

    it('EE 02 - Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        const longText = 'Texto descritivo de teste'
 
         cy.get("input[id='firstName']").type('Marcelo')
         cy.get("input[id='lastName']").type('Macedo')
         cy.get("input[id='email']").type('marcelo.macedo.teste.com')
         cy.get("textarea[id='open-text-area']").type(longText)
 
         cy.get("button[type='submit']").click()
 
         cy.get("span[class='error']")
         .should('be.visible')
         .contains('Valide os campos obrigatórios!')
     })

    it('EE 03 - Validar campo de telefone ao informar valor não numérico', function() {

         cy.get("input[id='phone']").type('abc')
         .should('not.have.value')
     })

    it('EE 04 - Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        const longText = 'Texto descritivo de teste, Texto descritivo de teste'

        cy.get("input[id='firstName']").type('Marcelo')
        cy.get("input[id='lastName']").type('Macedo')
        cy.get("input[id='email']").type('marcelo.macedo@teste.com')
        cy.get("textarea[id='open-text-area']").type(longText)

        cy.get("input[id='phone-checkbox']").click()

        cy.get("button[type='submit']").click()

        cy.get("span[class='error']")
        .should('be.visible')
        .contains('Valide os campos obrigatórios!')
     })

     it('EE 05 - Preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        const longText = 'Texto descritivo de teste, Texto descritivo de teste'

        cy.get("input[id='firstName']")
            .type('Marcelo').should('have.value', 'Marcelo')
            .clear().should('have.value', '')

        cy.get("input[id='lastName']")
            .type('Macedo').should('have.value', 'Macedo')
            .clear().should('have.value', '')
        
        cy.get("input[id='email']").type('marcelo.macedo@teste.com')
            .should('have.value', 'marcelo.macedo@teste.com')
            .clear().should('have.value', '')
        
        cy.get("input[id='phone']").type('11912341234')
            .should('have.value', '11912341234')
            .clear().should('have.value', '')

     })


    it('EE 06 - Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
       
        cy.get("button[type='submit']").click()
 
        cy.get("span[class='error']")
        .should('be.visible')
        .contains('Valide os campos obrigatórios!')
     })

    it('EE 07 - Envia o formuário com sucesso usando um comando customizado', function() {
       
        cy.fillMandatoryFieldsAndSubmit()

        cy.get("span[class='success']")
        .should('be.visible')
        .contains('Mensagem enviada com sucesso')
     })

    it('EE 08 - Faça uso do comando contains ao invés do get', function() {
       
        cy.contains("button[type='submit']", "Enviar").click()
 
        cy.get("span[class='error']")
        .should('be.visible')
        .contains('Valide os campos obrigatórios!')
     })
  })