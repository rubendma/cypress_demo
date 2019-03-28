/// <reference types="Cypress" />
const nameComputer=`computer-test-${Date.now()}`;
let urlVariable;
let computerToDelete = true;
describe('My First Test', function() {
  it('Visits the gatling page', function() {
    cy.visit('http://computer-database.gatling.io');
    cy.get(`#add`).click();
    cy.url().should('include', '/computers/new');
    cy.contains(`Add a computer`);
  });

  it('Fill all fields to create the computer', function() {
    cy.log(`COMPUTER: ${nameComputer}`);
    cy.get(`#name`).type(nameComputer);
    cy.get(`#introduced`).type(`2019-03-01`);
    cy.get(`#discontinued`).type(`2019-03-01`);
    cy.get(`#company`).select(`Netronics`);
    cy.get(`.btn.primary`).click();
    cy.get(`.alert-message.warning`).should(`contain`, `has been created`);
  });

  it('Search the computer and validate the result', function(){
    cy.get(`#searchbox`).type(nameComputer);
    cy.get(`#searchsubmit`).click();
    cy.get(`td a[href*='/computers/']`).should('have.text', nameComputer).click();
    cy.get(`#name`).should('have.value', nameComputer);
    cy.url().then((urlText)=>{
      urlVariable=urlText;
    })
  })

  after(() => {
    if (computerToDelete) {
      var resp=cy.request({
        method:'POST',
        url: `${urlVariable}/delete`,
        form: true,
        body: {
          }
      });
    }
  });

})