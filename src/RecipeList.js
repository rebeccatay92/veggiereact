import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, ButtonGroup, Button } from 'reactstrap'

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

  deleteRecipe (recipeId) {
    window.fetch(`http://localhost:3001/recipes/${recipeId}`, {
      method: 'DELETE'
    })
      .then(res => {
        return res.json()
      })
      .then(json => {
        console.log('json')
        window.location.reload()
      })
      .catch(err => {
        console.log('err', err)
      })
  }

  redirectToRecipe (id) {
    this.props.history.push(`/recipes/${id}`)
  }

  resetDatabase () {
    window.fetch('http://localhost:3001/reseed')
      .then(res => {
        window.location.reload()
      })
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
                <Col sm='12' md='6' lg='4' key={i}>
                  <div style={{boxShadow: '2px 2px 10px rgb(210, 210, 210)', width: '100%', height: '450px', marginBottom: '2rem'}}>
                    <img className='img-fluid' src={recipe.coverPhotoUrl} alt='recipe photo' style={{width: '100%', height: '75%', maxHeight: '80%', objectFit: 'cover', cursor: 'pointer'}} onClick={() => this.redirectToRecipe(recipe._id)} />
                    <div style={{width: '100%', height: '25%', maxHeight: '25%', padding: '0.5rem'}}>
                      <h5 style={{fontFamily: 'Average, sans-serif'}}>{recipe.recipeTitle}</h5>
                      <h5 style={{fontFamily: 'Average, sans-serif', color: '#3bbf2f'}}>{recipe.vegCategory}</h5>
                      <ButtonGroup>
                        <Link to={`/recipes/${recipe._id}/edit`}>
                          <Button outline color='primary'>Edit</Button>
                        </Link>
                        <Button outline color='danger' onClick={() => this.deleteRecipe(recipe._id)}>Delete</Button>
                      </ButtonGroup>
                    </div>
                  </div>
                </Col>
              )
            })}
          </Row>

          <Button outline size='sm' onClick={() => this.resetDatabase()}>Click here to reset database</Button>
        </Col>
      </Row>
    )
  }
}

export default RecipeList
