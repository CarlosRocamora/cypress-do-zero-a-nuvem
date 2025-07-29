describe('Central de Atendimento ao Cliente TAT', () => {

    beforeEach(() => {
        cy.visit('src/index.html')
    })

    it('verifica o título da aplicação', () => {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', () => {
        const longText = Cypress._.repeat('test', 50)

        cy.get('#firstName')
          .as('nome')
          .type('Carlos')
        cy.get('#lastName')
          .as('sobrenome')
          .type('Henrique')
        cy.get('#email')
          .as('email')
          .type('carloshenrique@gmail.com')
        cy.get('#open-text-area')
          .as('areaTexto')
          .type(longText, {delay: 0})
        
        cy.get('@nome').should('have.value', 'Carlos')
        cy.get('@sobrenome').should('have.value', 'Henrique')
        cy.get('@email').should('have.value', 'carloshenrique@gmail.com')
        cy.get('@areaTexto').should('have.value', longText)

        cy.get('.button').click()
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        const longText = Cypress._.repeat('test', 50)

        cy.get('#firstName')
          .as('nome')
          .type('Carlos')
        cy.get('#lastName')
          .as('sobrenome')
          .type('Henrique')
        cy.get('#email')
          .as('email')
          .type('carloshenriquegmail.com')
        cy.get('#open-text-area')
          .as('areaTexto')
          .type(longText, {delay: 0})
        
        cy.get('@nome').should('have.value', 'Carlos')
        cy.get('@sobrenome').should('have.value', 'Henrique')
        cy.get('@email').should('have.value', 'carloshenriquegmail.com')
        cy.get('@areaTexto').should('have.value', longText)

        cy.get('.button').click()
        cy.get('.error').should('be.visible')
    })

    it('inserindo valor não-numérico no campo de telefone', () => {
        cy.get('#phone')
          .type('test')
          .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName')
          .type('Carlos')
          .should('have.value', 'Carlos')
        cy.get('#lastName')
          .type('Henrique')
          .should('have.value', 'Henrique')
        cy.get('#email')
          .type('carloshenrique@gmail.com')
          .should('have.value', 'carloshenrique@gmail.com')
        cy.get('#open-text-area')
          .type('test')
          .should('have.value', 'test')

        cy.get("[type='checkbox'][value='phone")
          .check()
          .should('be.checked')

        cy.get('.button')
          .should('be.visible')
          .click()
        
        cy.get('.error')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        const data = {
            nome: 'carlos',
            sobrenome: 'henrique',
            email: 'carloshenrique@gmail.com',
            telefone: '1234567890',
        }

        cy.get('#firstName')
          .type(data.nome)
          .should('have.value', data.nome)
          .clear()
          .should('have.value', '')
        cy.get('#lastName')
          .type(data.sobrenome)
          .should('have.value', data.sobrenome)
          .clear()
          .should('have.value', '')
        cy.get('#email')
          .type(data.email)
          .should('have.value', data.email)
          .clear()
          .should('have.value', '')
        cy.get('#phone')
          .type(data.telefone)
          .should('have.value', data.telefone)
          .clear()
          .should('have.value', '')  
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.get('.button')
          .should('be.visible')
          .click()
        cy.get('.error').should('be.visible')  
    })

    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    
})