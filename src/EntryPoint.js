import React from 'react'
import { Row, Col, Jumbotron, Button } from 'reactstrap'
import { Link } from 'react-router-dom'

const EntryPoint = () => {
  return (
    <div style={{height: '100vh', textAlign: 'justify'}} className='d-flex flex-column justify-content-center'>
      <Row>
        <Col sm='12' md={{size: 8, offset: 2}}>
          <Jumbotron>
            <h1>abillionveg assignment</h1>
            <p>This is a user's recipe page for mocked user with _id:'seededuser'. User is able to create, update, and delete recipes. Components are interfaced with Mongo backend via REST API calls. Laid out with Bootstrap.</p>
            <Link to='/recipes'>
              <Button color='primary' size='lg'>
              Proceed
              </Button>
            </Link>
          </Jumbotron>
        </Col>
      </Row>
    </div>
  )
}

export default EntryPoint
