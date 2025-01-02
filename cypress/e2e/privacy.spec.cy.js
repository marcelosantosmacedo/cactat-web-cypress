Cypress._.times(3, function(){
  
it('EE 02 - Testa a página da política de privacidade de forma independente', function() {
  cy.visit('https://cac-tat.s3.eu-central-1.amazonaws.com/privacy.html')
  
  cy.contains('Talking About Testing').should('be.visible')
  
})

})



