import React from 'react'
import { Row, FormGroup, Label, Input, Button } from 'reactstrap'
import { AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation'

const RecipeFormIngredientRow = ({
  name,
  amount,
  ingredientIndex,
  groupIndex,
  handleIngredientChange,
  removeIngredient
}) => {
  return (
    <Row>
      <AvGroup className='col-7'>
        <Label for={`group${groupIndex}ingredient${ingredientIndex}`}>Ingredient</Label>
        <AvInput id={`group${groupIndex}ingredient${ingredientIndex}`} name={`group${groupIndex}ingredient${ingredientIndex}`} value={name} onChange={e => handleIngredientChange(e, ingredientIndex, 'name')} required />
        <AvFeedback>Required</AvFeedback>
      </AvGroup>
      <FormGroup className='col-4'>
        <Label for={`group${groupIndex}ingredient${ingredientIndex}amount`}>Amount</Label>
        <Input id={`group${groupIndex}ingredient${ingredientIndex}amount`} value={amount} onChange={e => handleIngredientChange(e, ingredientIndex, 'amount')} />
      </FormGroup>
      <div className='col-1 d-flex justify-content-end align-items-end' style={{marginBottom: '1rem'}}>
        <Button color='primary' size='md' onClick={removeIngredient}>X</Button>
      </div>
    </Row>
  )
}

export default RecipeFormIngredientRow
