// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {

    const longText = 'Texto descritivo de teste, Texto descritivo de teste'

    cy.get("input[id='firstName']").type('Marcelo')
    cy.get("input[id='lastName']").type('Macedo')
    cy.get("input[id='email']").type('marcelo.macedo@teste.com')
    cy.get("textarea[id='open-text-area']").type(longText, {delay: 20})

    cy.get("button[type='submit']").click()

})