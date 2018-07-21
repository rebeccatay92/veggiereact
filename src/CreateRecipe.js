import React, { Component } from 'react'
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap'

class CreateRecipe extends Component {
  constructor (props) {
    super(props)
    this.state = {
      //
    }
  }

  render () {
    return (
      <Row style={{minHeight: '100vh'}}>
        <Col md='12' lg={{size: 8, offset: 2}}>

          <div style={{margin: '24px 0'}}>
            <h1>Create a recipe</h1>
            <h4>Share your recipe with the community</h4>
          </div>

          <Row noGutters>
            <Col sm='12'>
              <Form>
                <FormGroup>
                  <Label for='recipeTitle'>Title</Label>
                  <Input placeholder="Your recipe's title" />
                </FormGroup>
                <FormGroup>
                  <Label for='servings'>Serves</Label>
                  <Input placeholder='Number of servings' />
                </FormGroup>
                <FormGroup>
                  <Label for='time'>Time</Label>
                  <Input />
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}

export default CreateRecipe
