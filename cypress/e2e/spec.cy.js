describe('Global English Campus Test', () => {
  it('Login and navigate to class', () => {
    cy.viewport(1280, 720)
      // Login to the application
      cy.visit('https://beta.globalenglishcampus.com/login');
      cy.get("#login-email").type('student@default.com');
      cy.get("#login-password").type('nepal123');
      cy.get('button[type="submit"]').click({force:true})

      // Wait for the login process to complete
      cy.url().should('include', '/dashboard');

      // Navigate to the class tab and select the class
      cy.get(".nav-link").contains('Classes').click({force:true})
      cy.wait(4000) 
      cy.contains(' Math QA ')
      cy.get('.card-body').eq(2).find('button').contains(' Go to Classroom ').click({force:true})


      // Select the specific course and lesson
      cy.wait(4000)
      cy.get('#course-btn-65').contains(' Math 2 - Numbers ').click();
      cy.wait(4000)
      cy.contains(' Odd and Even ').click()
      cy.contains('Identify Even or Odd Numbers').click({force:true})

      // Click 'Start'
      cy.get('button').contains('Start').click({force:true})

      // Verify API response
      cy.request('GET', 'https://beta.globalenglishcampus.com/api/v1/lesson/568/problem')
        .then((response) => {
            expect(response.status).to.eq(200);
        });
  });
});