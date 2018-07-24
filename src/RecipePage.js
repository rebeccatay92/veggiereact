import React, { Component } from 'react'
import { Row, Col, Button } from 'reactstrap'
import { Link } from 'react-router-dom'

class RecipePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      recipe: {}
    }
  }

  componentDidMount () {

    console.log('props', this.props.match)

    let recipeId = this.props.match.params.id

    window.fetch(`http://localhost:3001/recipes/${recipeId}`)
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
      <Row style={{padding: '3rem 0'}}>
        <Col md='12' lg={{size: 6, offset: 3}}>

          <div className='d-flex' style={{height: '100px'}}>
            <div style={{width: '100px', height: '100px', borderRadius: '50%', marginRight: '1rem'}}>
              <img className='img-fluid' src={recipe.creator.avatarUrl} alt='creator avatar' style={{width: '100%', height: '100%', borderRadius: '50%'}} />
            </div>
            <div className='d-flex flex-column justify-content-between' style={{flex: 1}}>
              <h4 style={{fontFamily: 'Open Sans, sans-serif', fontSize: '1.6rem', fontWeight: '600', color: '#222222', margin: 0}}>{recipe.creator.username}</h4>
              <p style={{margin: 0, fontSize: '0.8rem'}}>{recipe.creator.about}</p>
              <h6 style={{margin: 0, color: '#3bbf2f'}}>{recipe.creator.vegCategory}</h6>
            </div>
          </div>

          <div style={{marginTop: '3rem', textAlign: 'center'}}>
            <h2 style={{fontFamily: 'Fjalla One, sans-serif'}}>{recipe.recipeTitle}</h2>
          </div>

          <Row style={{textAlign: 'center', fontFamily: 'Average, sans-serif'}} className='d-flex justify-content-around'>
            <h5>{recipe.vegCategory}</h5>
            <h5>Serves: {recipe.servings}</h5>
            <h5>Time: {recipe.time}</h5>
          </Row>

          <Row>
            <Col md='12'>
              <img src={recipe.coverPhotoUrl || '#'} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
            </Col>
          </Row>

          <hr />

          <Row>
            <Col md='12' style={{textAlign: 'center', fontFamily: 'Average, sans-serif'}}>
              <h3>Ingredients Needed</h3>
            </Col>
          </Row>

          <Row>
            {recipe.ingredients.map((ingredient, i) => {
              return (
                <Col key={`ingredient${i}`} md='12' className='d-flex justify-content-between' style={{fontFamily: 'Average, sans-serif'}}>
                  <h6>{ingredient.name}</h6>
                  <h6>{ingredient.amount}</h6>
                </Col>
              )
            })}
          </Row>

          {recipe.groups.map((group, i) => {
            return (
              <Row noGutters key={`group${i}`} style={{margin: '1rem 0'}}>
                <h5 className='col-12' style={{textDecoration: 'underline', fontFamily: 'Average, sans-serif'}}>{group.groupHeading}</h5>
                {group.groupedItems.map((item, j) => {
                  return (
                    <Col key={`group${i}ingredient${j}`} md='12' className='d-flex justify-content-between' style={{fontFamily: 'Average, sans-serif'}}>
                      <h6>{item.name}</h6>
                      <h6>{item.amount}</h6>
                    </Col>
                  )
                })}
              </Row>
            )
          })}

          <hr />

          <Row style={{marginBottom: '5rem', fontFamily: 'Average, sans-serif'}}>
            <Col md='12' style={{textAlign: 'center'}}>
              <h3>Instructions</h3>
            </Col>
            <ol style={{listStylePosition: 'outside'}}>
              {recipe.instructions.map((step, i) => {
                return (
                  <li key={`step${i}`} style={{fontSize: '1.2rem', textAlign: 'justify', margin: '1rem 0'}}>{step}</li>
                )
              })}
            </ol>
          </Row>

          <Link to='/recipes'>
            <Button block color='primary'>Return to Recipes</Button>
          </Link>

        </Col>
      </Row>
    )
  }
}

export default RecipePage
