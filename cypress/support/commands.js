Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    text: 'Test.'
}) => {
    cy.get("[name='firstName']")
      .as('nome')
      .should('be.visible')
      .type(data.firstName) 
    cy.get("[name='lastName']")
      .as('sobrenome')
      .should('be.visible')
      .type(data.lastName)
    cy.get("[type='email']")
      .as('email')
      .should('be.visible')
      .type(data.email)
    cy.get("[name='open-text-area']")
      .as('areaDeTexto')
      .should('be.visible')
      .type(data.text)
    /*cy.get('@nome').should('have.value', 'Carlos')
    cy.get('@sobrenome').should('have.value', 'Henrique')
    cy.get('@email').should('have.value', 'carloshenrique@gmail.com')*/
    cy.get("[type='submit']").click()  
    cy.get(".success")
      .should('be.visible')
})

Cypress.Commands.add('completarCamposObrigatorios', (dados = {
            nome: 'Coraline',
            sobrenome: 'Rocamora',
            email: 'coralinerocamora@gmail.com',
            text: 'teste.'
}) => {
  cy.get("[name='firstName']").type(dados.nome)
  cy.get("[name='lastName']").type(dados.sobrenome)  
  cy.get("[name='email']").eq(0).type(dados.email) 
  cy.get("[name='open-text-area']").type(dados.text)
  cy.get("[type='submit']").click()
})

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Carlos')
    cy.get('#lastName').type('Henrique')
    cy.get('#email').type('carloshenrique@gmail.com')
    cy.get('#open-text-area').type('test')

    cy.contains('button', 'Enviar').click()
})