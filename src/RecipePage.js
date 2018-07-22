import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'

class RecipePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      recipe: {}
    }
  }

  componentDidMount () {
    // console.log('this.props', this.props.match.url)
    let endpoint = this.props.location.pathname

    window.fetch(`http://localhost:3001${endpoint}`)
      .then(res => {
        return res.json()
      })
      .then(recipe => {
        console.log('recipe', recipe)
        this.setState({
          isLoading: false,
          recipe: recipe
        })
      })
  }

  render () {
    let { isLoading, recipe } = this.state

    if (isLoading) return <h1>Loading...</h1>
    return (
      <Row>
        <Col>
          <div style={{marginTop: '24px'}}>
            <h1>{recipe.title}</h1>
          </div>
        </Col>
      </Row>
    )
  }
}

export default RecipePage
