import React from 'react'
import { Col, ButtonGroup, Button } from 'reactstrap'
import { Link } from 'react-router-dom'

const RecipeCard = ({
  coverPhotoUrl,
  recipeTitle,
  vegCategory,
  recipeId,
  redirectToRecipe,
  deleteRecipe
}) => {
  return (
    <Col sm='12' md='6' lg='4'>
      <div style={{boxShadow: '2px 2px 10px rgb(210, 210, 210)', width: '100%', height: '400px', marginBottom: '2rem'}}>
        <img className='img-fluid' src={coverPhotoUrl} alt='recipe photo' style={{width: '100%', height: '70%', maxHeight: '70%', objectFit: 'cover', cursor: 'pointer'}} onClick={redirectToRecipe} />
        <div style={{width: '100%', height: '30%', maxHeight: '30%', padding: '0.5rem'}}>
          <h5 style={{fontFamily: 'Average, sans-serif', cursor: 'pointer'}} onClick={redirectToRecipe}><strong>{recipeTitle}</strong></h5>
          <h5 style={{fontFamily: 'Average, sans-serif', color: '#3bbf2f'}}>{vegCategory}</h5>
          <ButtonGroup>
            <Link to={`/recipes/${recipeId}/edit`}>
              <Button outline color='primary' size='sm'>Edit</Button>
            </Link>
            <Button outline color='danger' size='sm' onClick={deleteRecipe} style={{marginLeft: '0.5rem'}}>Delete</Button>
          </ButtonGroup>
        </div>
      </div>
    </Col>
  )
}

export default RecipeCard
