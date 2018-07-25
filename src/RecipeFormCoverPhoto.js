import React from 'react'
import { AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation'
import { Label } from 'reactstrap'

const RecipeFormCoverPhoto = ({
  coverPhotoUrl,
  formAction,
  uploadCoverPhoto
}) => {
  return (
    <AvGroup>
      <Label for='coverPhoto'>Upload a cover photo</Label>
      <AvInput id='coverPhoto' name='coverPhotoUrl' type='file' onChange={uploadCoverPhoto} accept='.jpg, .jpeg, .png' required={formAction === 'create'} />
      <AvFeedback>You need a photo for your recipe</AvFeedback>
      <div style={{width: '100%', height: '350px', marginTop: '1rem'}}>
        <img className='img-fluid' alt='coverphoto' src={coverPhotoUrl || 'http://via.placeholder.com/540x350'} style={{width: '100%', height: '100%', maxWidth: '100%', maxHeight: '100%', objectFit: 'cover'}} />
      </div>
    </AvGroup>
  )
}

export default RecipeFormCoverPhoto
