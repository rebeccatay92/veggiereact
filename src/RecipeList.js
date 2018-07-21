import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button } from 'reactstrap'

class RecipeList extends Component {
  constructor (props) {
    super(props)
    //
  }

  componentDidMount () {
    // fetch data from backend
  }

  redirectToRecipe () {
    console.log('props', this.props.history.push('/recipes/1'))
  }

  render () {
    return (
      <Row style={{minHeight: '100vh'}}>
        <Col md='12' lg={{size: 8, offset: 2}}>

          <div style={{margin: '24px 0'}}>
            <h1>Your recipes</h1>
            <h4>Discover new and exciting flavors</h4>
          </div>
          <Link to='/recipes/new'>
            <Button size='md' color='primary' style={{marginBottom: '24px'}}>Post a new recipe</Button>
          </Link>

          <Row>
            <Col sm='12' md='6'>
              <Card style={{marginBottom: '16px', cursor: 'pointer'}} onClick={() => this.redirectToRecipe()}>
                <CardImg top src='http://via.placeholder.com/450x250' width='100%' alt='cardimg' />
                <CardBody>
                  <CardTitle>Recipe title</CardTitle>
                  <CardText>By xyz</CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}

export default RecipeList
