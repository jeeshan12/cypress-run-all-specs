/// <reference types="cypress" />
describe('open url', () => {
  it('opens google page', () => {
    cy.visit('https://cat-fact.herokuapp.com/#/');
  })
})