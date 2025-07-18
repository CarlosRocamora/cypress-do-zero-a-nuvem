describe ('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('src/index.html')    
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
})
  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('euteamo', 10)
    cy.get("[name='firstName']")
      .as('nome')
      .should('be.visible')
      .type('Jamilly') 
    cy.get("[name='lastName']")
      .as('sobrenome')
      .should('be.visible')
      .type('Tomaz')
    cy.get("[type='email']")
      .as('email')
      .should('be.visible')
      .type('jamillytomaz@gmail.com')
    cy.get("[name='open-text-area']")
      .as('areaDeTexto')
      .should('be.visible')
      .type(longText, {delay: 0})  
    cy.get('@nome').should('have.value', 'Jamilly')
    cy.get('@sobrenome').should('have.value', 'Tomaz')
    cy.get('@email').should('have.value', 'jamillytomaz@gmail.com')
    cy.contains('button', 'Enviar').click()  
    cy.get(".success")
      .should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get("[name='firstName']").type('Carlos')
    cy.get("[name='lastName']").type('Henrique')
    cy.get("[type='email']").type('carloshenrique')
    cy.get("[name='open-text-area']").type('test')
    cy.get("[type='submit']").click()
    cy.get(".error").should('be.visible')   
  })

  it('teste de valores não-numericos no campo telefone', () => {
    cy.get("[name='firstName']").type('Carlos')
    cy.get("[name='lastName']").type('Henrique')
    cy.get("[type='email']").type('carloshenrique@gmail.com')
    cy.get("[name='open-text-area']").type('test')
    cy.get("[type='number']")
      .type('abcde')
      .should('have.value', '')
    cy.get("[type='submit']").click()  
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get("[name='firstName']").type('Carlos')
    cy.get("[name='lastName']").type('Henrique')
    cy.get("[type='email']").type('carloshenrique@gmail.com')
    cy.get("[name='open-text-area']").type('test')
    cy.get("#phone-checkbox").check()
    cy.get("[type='submit']").click()  
    cy.get(".error").should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get("[name='firstName']")
      .type('Carlos')
      .should('have.value', 'Carlos')
      .clear()
      .should('have.value', '')
    cy.get("[name='lastName']")
      .type('Henrique')
      .should('have.value', 'Henrique')
      .clear()
      .should('have.value', '')
    cy.get("[type='email']")
      .type('carloshenrique@gmail.com')
      .should('have.value', 'carloshenrique@gmail.com')
      .clear()
      .should('have.value', '')
    cy.get("#phone")
      .type('123456789')
      .should('have.value', '123456789')
      .clear()
      .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get("[type='submit']").click()  
    cy.get(".error").should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {
    /*const data = {
      firstName: 'Carlos',
      lastName: 'Henrique',
      email: 'carloshenrique@gmail.com',
      text: 'Teste.'
    }*/

    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get("#product")
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get("#product")
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get("#product")
      .select(1)
      .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get("[value='feedback']")
      .check()
      .should('be.checked').and('have.value', 'feedback')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get("[type='radio']")
      .each(($el) => {
        cy.wrap($el)
          .check()
          .should('be.checked')
      })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get("[type='checkbox']")
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get("[type='file']")
      .selectFile('cypress/fixtures/Export (1).xlsx')
      .should(input => {
        expect(input[0].files[0].name).to.equal('Export (1).xlsx')
      })
  })
    
})

