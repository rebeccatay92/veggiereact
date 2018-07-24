import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, ButtonGroup, Button } from 'reactstrap'
import RecipeCard from './RecipeCard'

class RecipeList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      recipes: []
    }
  }

  componentDidMount () {
    window.fetch(`https://veggiebackend.herokuapp.com/recipes`)
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
    window.fetch(`https://veggiebackend.herokuapp.com/recipes/${recipeId}`, {
      method: 'DELETE'
    })
      .then(res => {
        return res.json()
      })
      .then(json => {
        // console.log('json')
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
    window.fetch(`https://veggiebackend.herokuapp.com/reseed`)
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
                <RecipeCard key={`recipeCard${i}`} coverPhotoUrl={recipe.coverPhotoUrl} recipeTitle={recipe.recipeTitle} vegCategory={recipe.vegCategory} recipeId={recipe._id} redirectToRecipe={() => this.redirectToRecipe(recipe._id)} deleteRecipe={() => this.deleteRecipe(recipe._id)} />
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
