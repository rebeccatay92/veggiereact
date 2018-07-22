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
        <Col md='12' lg={{size: 6, offset: 3}}>

          <div style={{margin: '24px 0'}}>
            <h1>Create a recipe</h1>
            <h4>Share your recipe with the community</h4>
          </div>

          <Row noGutters>
            <Col sm='12'>
              <Form>
                <FormGroup>
                  <Label for='recipeTitle'>Title</Label>
                  <Input id='recipeTitle' placeholder="Your recipe's title" />
                </FormGroup>
                <Row>
                  <FormGroup className='col-6'>
                    <Label for='servings'>Serves</Label>
                    <Input id='servings' placeholder='No. of servings' />
                  </FormGroup>
                  <FormGroup className='col-6'>
                    <Label for='timeNeeded'>Time needed</Label>
                    <Input id='timeNeeded' />
                  </FormGroup>
                </Row>
                <FormGroup>
                  <Label for='coverPhoto'>Upload a cover photo</Label>
                  <Input id='coverPhoto' type='file' />
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
