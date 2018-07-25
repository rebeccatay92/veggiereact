import React from 'react'
import { Row, Button, Label } from 'reactstrap'
import { AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation'

const RecipeFormInstructionRow = ({
  step,
  index,
  handleStepChange,
  removeStep
}) => {
  return (
    <Row>
      <AvGroup className='col-11'>
        <Label for={`step${index}`}>Step {index + 1}</Label>
        <AvInput id={`step${index}`} name={`step${index}`} type='textarea' rows='3' value={step} onChange={e => handleStepChange(e)} required />
        <AvFeedback>Required</AvFeedback>
      </AvGroup>
      <div className='col-1 d-flex justify-content-end align-items-end' style={{marginBottom: '1rem'}}>
        <Button color='primary' size='md' onClick={removeStep}>X</Button>
      </div>
    </Row>
  )
}

export default RecipeFormInstructionRow
