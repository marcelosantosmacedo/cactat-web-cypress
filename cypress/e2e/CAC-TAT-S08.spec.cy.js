describe('Central de Atendimento ao Cliente TAT', function() {

    const THREE_SECONDS_IN_MS = 3000

    beforeEach(() => {
        cy.visit('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
    })

    it('EP 01 - Preenche os campos obrigatórios e envia o formulário', function() {
       const longText = 'Texto descritivo de teste, Texto descritivo de teste'

       cy.clock()

       cy.get("input[id='firstName']").type('Marcelo')
       cy.get("input[id='lastName']").type('Macedo')
       cy.get("input[id='email']").type('marcelo.macedo@teste.com')
       cy.get("textarea[id='open-text-area']").type(longText, {delay: 20})

       cy.get("button[type='submit']").click()

       cy.get("span[class='success']")
       .should('be.visible')
       .contains('Mensagem enviada com sucesso')

       cy.tick(THREE_SECONDS_IN_MS)

       cy.get("span[class='success']")
       .should('not.be.visible')

    })

    it('EP 02 - Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        const longText = 'Texto descritivo de teste'
 
        cy.clock()
        cy.get("input[id='firstName']").type('Marcelo')
        cy.get("input[id='lastName']").type('Macedo')
        cy.get("input[id='email']").type('marcelo.macedo.teste.com')
        cy.get("textarea[id='open-text-area']").type(longText)
 
        cy.get("button[type='submit']").click()
 
        cy.get("span[class='error']")
        .should('be.visible')
        .contains('Valide os campos obrigatórios!')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get("span[class='error']")
        .should('not.be.visible')
     })

     it('EP 01 - Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        const longText = 'Texto descritivo de teste, Texto descritivo de teste'

        cy.clock()

        cy.get("input[id='firstName']").type('Marcelo')
        cy.get("input[id='lastName']").type('Macedo')
        cy.get("input[id='email']").type('marcelo.macedo@teste.com')
        cy.get("textarea[id='open-text-area']").type(longText)

        cy.get("input[id='phone-checkbox']").check()

        cy.get("button[type='submit']").click()

        cy.get("span[class='error']")
        .should('be.visible')
        .contains('Valide os campos obrigatórios!')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get("span[class='error']")
        .should('not.be.visible')
     })

     it('EP 06 - Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
       
        cy.clock()

        cy.get("button[type='submit']").click()
 
        cy.get("span[class='error']")
        .should('be.visible')
        .contains('Valide os campos obrigatórios!')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get("span[class='error']")
        .should('not.be.visible')

     })

     it('EP 07 - Envia o formuário com sucesso usando um comando customizado', function() {
       
        cy.clock()
       
        cy.fillMandatoryFieldsAndSubmit()

        cy.get("span[class='success']")
        .should('be.visible')
        .contains('Mensagem enviada com sucesso')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get("span[class='success']")
        .should('not.be.visible')
     })

     it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
      cy.get('.success')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Mensagem enviada com sucesso.')
        .invoke('hide')
        .should('not.be.visible')
      cy.get('.error')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Valide os campos obrigatórios!')
        .invoke('hide')
        .should('not.be.visible')
    })

    it('EP 01 - Preenche a area de texto usando o comando invoke', function() {
      const longText = Cypress._.repeat('0123456789', 20)

      cy.get('#open-text-area')
        .invoke('val', longText)
        .should('have.value', longText)


    })


    it('EP 01 - Faz um requisição HTTP', function() {
      
      cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
         .should(function(response){
            const{ status, statusText, body } = response
            expect(status).to.eq(200)
            expect(statusText).to.eq('OK')
            expect(body).to.include('CAC TAT')

      })

    })

    it('EP 01 - Encontra o gato escondido', function() {
      
      cy.get('#cat')
        .invoke('show')
        .should('be.visible')

    })

})
   