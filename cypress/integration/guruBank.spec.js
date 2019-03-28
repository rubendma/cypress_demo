/// <reference types="Cypress" />
const customerEmail=`mail${Date.now()}@pruebas.com`;
let idCustomer;
describe('My First Test', function() {
  before(() => {
    cy.visit(`/V4`);
    cy.get(`input[name=uid]`).type(`mgr123`);
    cy.get(`input[name=password]`).type(`mgr!23`);
    cy.get(`input[name=btnLogin]`).click();
    cy.get(`.heading3`).should('contain', `mgr123`);
  });

  it('create a customer', function(){
    cy.get(`a[href="addcustomerpage.php"]`).click();
    cy.get(`input[name=name]`).type(`Test Name`);
    cy.get(`input[name=rad1][value=f]`).click();
    cy.get(`#dob`).type(`1990-06-12`);
    cy.get(`textarea[name=addr]`).type(`Caller de pruebas`);
    cy.get(`input[name=city]`).type(`Medellin`);
    cy.get(`input[name=state]`).type(`Antioquia`);
    cy.get(`input[name=pinno]`).type(`123456789`);
    cy.get(`input[name=telephoneno]`).type(`3003332211`);
    cy.get(`input[name=emailid]`).type(customerEmail);
    cy.get(`input[name=password]`).type(`1234Abcd`);
    cy.get(`input[name=sub]`).click();
    cy.get(`#customer tbody tr:nth-child(4) td:nth-child(2)`)
      .invoke('text')
      .then(idCust => {
        idCustomer = idCust;
        cy.log(`ID CUSTOMER: ${idCustomer}`);
      })
  });

  it('Delete customer',function(){
    cy.get(`a[href="DeleteCustomerInput.php"]`).click();
    cy.get(`input[name=cusid]`).type(idCustomer);
    cy.get(`input[name=AccSubmit]`).click();
    //cy.focused().click();
  });


})