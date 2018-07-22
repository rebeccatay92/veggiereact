import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button } from 'reactstrap'

class RecipeList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      recipes: []
    }
  }

  componentDidMount () {
    window.fetch('http://localhost:3001/recipes')
      .then(res => {
        return res.json()
      })
      .then(recipes => {
        this.setState({
          isLoading: false,
          recipes: recipes
        })
      })
  }

  redirectToRecipe (id) {
    this.props.history.push(`/recipes/${id}`)
  }

  render () {
    let { isLoading, recipes } = this.state

    if (isLoading) return <h1>Loading...</h1>

    return (
      <Row style={{minHeight: '100vh'}}>
        <Col md='12'>
          <div style={{margin: '24px 0'}}>
            <h1>Your recipes</h1>
            <h4>Discover new and exciting flavors</h4>
          </div>
          <Link to='/recipes/new'>
            <Button size='md' color='primary' style={{marginBottom: '24px'}}>Post a new recipe</Button>
          </Link>

          <Row>
            {recipes.map((recipe, i) => {
              return (
                <Col sm='12' md='6' key={i}>
                  <div style={{borderRadius: '5px', boxShadow: '2px 2px 10px rgb(210, 210, 210)', width: '100%', height: '350px', marginBottom: '24px', cursor: 'pointer'}} onClick={() => this.redirectToRecipe(recipe._id)}>
                    <img className='img-fluid' src={recipe.coverPhotoUrl} alt='recipe photo' style={{width: '100%', height: '80%', maxHeight: '80%', objectFit: 'cover'}} />
                    <div style={{width: '100%', height: '20%', maxHeight: '20%'}}>
                      <h5>{recipe.title}</h5>
                    </div>
                  </div>
                </Col>
              )
            })}
          </Row>
        </Col>
      </Row>
    )
  }
}

export default RecipeList
