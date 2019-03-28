/// <reference types="Cypress" />
const carName=`name${Date.now()}`;
describe('My First Test', function() {
  before(() => {
    cy.visit(`https://www.phptravels.net/admin`);  
    cy.login(`admin@phptravels.com`, `demoadmin`, `Super Admin`);
  });

  it('create a car', function(){
    cy.get(`a[href="#Cars"]`).click();
    cy.get(`#Cars li:nth-child(1) a`).should('have.text', `Cars`).click();
    cy.get(`.add_button .btn.btn-success`).click();
    cy.get('.cke_inner.cke_reset #cke_1_top', {timeout: 60000});
    cy.get(`input[name=carname]`, {timeout: 30000}).type(carName);
    cy.get(`select[name=carstars]`).select(`1`);
    cy.get(`select[name=cartype]`).select(`Van`, {force: true});
    cy.get(`#add`).click();
  });

  it('Search car crated',function(){
    cy.get(`.xcrud-search-toggle`).click();
    cy.get(`input[name=phrase]`).type(carName);
    cy.get(`.btn-group .xcrud-action.btn.btn-primary`).click();
    cy.get(`a[href*=${carName}]`).should('contain', carName);
  });

})