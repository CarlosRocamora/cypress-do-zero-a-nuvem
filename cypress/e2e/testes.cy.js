describe('Fazendo vários casos de teste', () => {
    beforeEach(() =>{
        cy.visit('src/index.html')
    })

    it('1 - verificando aba e url da página', () => {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
        cy.url().should('be.equal', 'http://localhost:64591/src/index.html')
    })

    it('2 - verificando título e subtitulo da página ', () => {
        cy.contains('H1', 'CAC TAT')
        cy.contains('p', 'Forneça o máximo de informações, por favor.')
        cy.get("#title").should('contain', 'CAC TAT')
        cy.get("#title").should('be.visible')
        cy.get("#title").should('exist')
    })

    it('3 - Enviando formulário preenchendo todos os campos obrigatórios', () => {
        const longText = Cypress._.repeat("amo nene", 30)
        cy.get("[name='firstName']")
          .should('be.visible')  
          .type('Coraline')
        cy.get("[name='lastName']")
          .should('be.visible')
          .type('Rocamora')    
        cy.get("[name='email']")
          .should('be.visible')
          .eq(0)
          .type('coralinerocamora@gmail.com') 
        cy.get("[name='open-text-area']")
          .should('be.visible')
          .type(longText, {delay: 0})    
        cy.get("[name='firstName']").should('have.value', 'Coraline')
        cy.get("[name='lastName']").should('have.value', 'Rocamora')
        cy.get("[name='email']").eq(0).should('have.value', 'coralinerocamora@gmail.com')
        cy.get("[name='open-text-area']").should('have.value', longText)  
        cy.get("[type='submit']").click()
        cy.get(".success")
          .should('be.visible')
          .should('contain', 'Mensagem enviada com sucesso.')
    })

    it('4 - Testando comando customizado', () => {
        cy.completarCamposObrigatorios()

        cy.get(".success")
          .should('be.visible')
          .should('contain', 'Mensagem enviada com sucesso.')
    })

    
    
})