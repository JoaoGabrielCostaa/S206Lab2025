import { FakeUser, generateFakeUser } from "../utils/fake-user"

function handleFakeRegister(): FakeUser {
  const user = generateFakeUser()

  cy.visit('/#/register')

  cy.get('input[name="firstName"]').type(user.firstName)
  cy.get('input[name="lastName"]').type(user.lastName)
  cy.get('input[name="username"]').type(user.username)
  cy.get('input[name="password"]').type(user.password)

  cy.get('button[type="submit"]').click()

  return user
}

function handleLogin(fakeUser: FakeUser) {
  cy.get('#username').type(fakeUser.username)
  cy.get('#password').type(fakeUser.password)
  cy.get('button[type="submit"]').click()
}

describe('Teste de registro de usuário', () => {
  it('Deve registrar um novo usuário com dados aleatórios (sucesso)', () => {
    handleFakeRegister()

    // Depois do registro, deve redirecionar para login
    cy.url().should('include', '/#/login')
    cy.contains('Registration successful').should('be.visible')
  })

  it('Deve registrar um novo usuário com dados aleatórios (erro)', () => {
    const user = generateFakeUser()

    cy.visit('/#/register')

    cy.get('input[name="firstName"]').type(user.firstName)
    cy.get('input[name="lastName"]').type(user.lastName)
    cy.get('input[name="username"]').type(user.username)

    cy.get('button[type="submit"]').should('be.disabled')
  })
})

describe('Teste de login de usuário', () => {
  let user: FakeUser

  before(() => {
    user = handleFakeRegister()
    cy.contains('Registration successful').should('be.visible')
    cy.wait(2000)
    cy.url().should('include', '/#/login', { timeout: 10000 })
  })

  beforeEach(() => {
    cy.visit('/#/login')
  })

  it('Deve efetuar o login (sucesso)', () => {
    handleLogin(user)

    cy.url().should('include', '/#/')
    cy.get('div.ng-scope > :nth-child(2)').should('be.visible')
  })

  it('Deve efetuar o login (erro)', () => {
    cy.get('#username').type(user.username)
    cy.get('button[type="submit"]').should('be.disabled')
  })
})

describe('Teste de deletar conta de usuário', () => {
  let user: FakeUser

  before(() => {
    user = handleFakeRegister()
    cy.contains('Registration successful').should('be.visible')
    cy.wait(2000)
    cy.url().should('include', '/#/login', { timeout: 10000 })
  })

  beforeEach(() => {
    cy.visit('/#/login')
  })

  it('Deve deletar um usuário e verificar se nao e possivel mais logar', () => {
    handleLogin(user)

    cy.url().should('include', '/#/')
    cy.get('.ng-binding > a').click()

    cy.get('.btn').click()
    handleLogin(user)

    cy.get('.ng-binding').should('be.visible')
    cy.get('.ng-binding').should('contain', 'Username or password is incorrect')
  })

})