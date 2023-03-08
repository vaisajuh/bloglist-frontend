describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user0 = {
      name: 'Juha Väisänen',
      username: 'jvaisa',
      password: 'salainen'
    }
    const user1 = {
      name: 'Leonard Nimoy',
      username: 'lnimoy',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user0)
    cy.request('POST', 'http://localhost:3003/api/users/', user1)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('Blogs')
    cy.contains('login')
  })
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('jvaisa')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('Juha Väisänen')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('jvaisa')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('.info').contains('wrong username or password')
    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'jvaisa', password: 'salainen' })
      cy.createBlog({
        title: 'maailma',
        author: 'jumala',
        url: 'www.maailma.fi',
        likes: '0'
      })
    })

    it('a blog can be created', function () {
      cy.get('#newBlog').click()
      cy.get('#title-input').type('blogi')
      cy.get('#author-input').type('bloggaaja')
      cy.get('#url-input').type('www.blogi.fi')
      cy.get('#likes-input').type('21')
      cy.get('#create').click()
      cy.get('.info').contains('a new blog: blogi by bloggaaja added')
    })

    it('a like-button functions properly', function() {
      cy.get('#view').click()
      cy.get('#like').click()
      cy.contains('1')

    })
    it('a delete-button fuctions properly', function() {
      cy.get('#view').click()
      cy.get('#delete').click()
      cy.get('html').should('not.contain', 'view')
    })

    it('a delete-button is visible only for a validated user', function() {
      cy.get('#logout').click()
      cy.login({ username: 'lnimoy', password: 'salainen' })
      cy.get('#view').click()
      cy.get('html').should('not.contain', 'delete')

    })
    it('blogs are sorted in descending order based on likes', function() {
      cy.createBlog({
        title: 'semmosta',
        author: 'emt',
        url: 'www.julma.fi',
        likes: '1'
      })

      cy.get('#view').click()
      cy.get('#view').click()

      cy.get('.blog').eq(0).should('contain', 'emt')
      cy.get('.blog').eq(1).should('contain', 'jumala')

      cy.get('.blog').eq(1).contains('like').click()
      cy.get('.blog').eq(1).contains('like').click()

      cy.get('.blog').eq(0).should('contain', 'jumala')
      cy.get('.blog').eq(1).should('contain', 'emt')
    })
  })
})