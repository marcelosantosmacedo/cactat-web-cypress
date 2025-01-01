describe('Central de Atendimento ao Cliente TAT', function() {

    const THREE_SECONDS_IN_MS = 3000

    beforeEach(() => {
        cy.visit('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
    })

    it('EE 01 - Preenche os campos obrigatórios e envia o formulário', function() {
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

    it('EE 02 - Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
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

     it('EE 01 - Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
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

     it('EE 06 - Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
       
        cy.clock()

        cy.get("button[type='submit']").click()
 
        cy.get("span[class='error']")
        .should('be.visible')
        .contains('Valide os campos obrigatórios!')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get("span[class='error']")
        .should('not.be.visible')

     })

     it('EE 07 - Envia o formuário com sucesso usando um comando customizado', function() {
       
        cy.clock()
       
        cy.fillMandatoryFieldsAndSubmit()

        cy.get("span[class='success']")
        .should('be.visible')
        .contains('Mensagem enviada com sucesso')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get("span[class='success']")
        .should('not.be.visible')
     })

    })