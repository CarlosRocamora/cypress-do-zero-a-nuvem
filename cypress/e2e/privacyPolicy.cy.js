Cypress._.times(10, () => {
  it('testa a página da política de privacidade de forma independente', () => {
    cy.visit('src/privacy.html')
    cy.contains('p', 'Não salvamos dados submetidos no formulário da aplicação CAC TAT.')
      .should('be.visible')
      .and('exist')
      .title()
      .should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de Privacidade')
    cy.url().should('contain' , 'privacy.html')
  })
})

