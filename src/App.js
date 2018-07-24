import React, { Component } from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'

import { Container, Row, Col, Jumbotron, Button, Navbar } from 'reactstrap'
import RecipeList from './RecipeList.js'
import RecipeForm from './RecipeForm.js'
import RecipePage from './RecipePage.js'

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <Container>
          <Switch>
            {/* <Route exact path='/' render={() => (
              <div style={{height: '100vh', textAlign: 'center'}}>
                <Row className='mx-auto'>
                  <Col sm='12' md={{size: 8, offset: 2}}>
                    <Jumbotron>
                      <h1>Assignment</h1>
                      <p>Assumptions are</p>
                      <Link to='/recipes'>
                        <Button color='primary' size='lg'>
                        Proceed
                        </Button>
                      </Link>
                    </Jumbotron>
                  </Col>
                </Row>
              </div>
            )} /> */}
            <Route exact path='/recipes' render={props => (
              <RecipeList {...props} />
            )} />

            <Route exact path='/recipes/new' render={props => (
              <RecipeForm {...props} action='create' />
            )} />

            <Route path='/recipes/:id/edit' render={props => (
              <RecipeForm {...props} action='edit' />
            )} />

            <Route path='/recipes/:id' render={props => (
              <RecipePage {...props} />
            )} />
          </Switch>
        </Container>
      </BrowserRouter>
    )
  }
}

export default App
