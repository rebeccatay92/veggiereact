import React, { Component } from 'react'
import { Row, Col, Form, FormGroup, Label, Input, ButtonGroup, Button } from 'reactstrap'
import { AvForm, AvGroup, AvField, AvInput, AvFeedback } from 'availity-reactstrap-validation'

class CreateRecipe extends Component {
  constructor (props) {
    super(props)
    this.state = {
      recipeTitle: '',
      servings: '',
      time: '',
      vegCategory: 'Vegan',
      coverPhotoUrl: '',
      ingredients: [{name: '', amount: ''}],
      groups: [
        // {
        //   groupHeading: 'Test group',
        //   groupedItems: [{name: 'testing', amount: '12'}]
        // }
      ],
      instructions: ['']
    }
  }

  handleChange (e, field) {
    this.setState({
      [field]: e.target.value
    })
  }

  handleIndivIngredientChange (e, i, field) {
    let currentIngredients = this.state.ingredients

    let beforeChangedEl = currentIngredients.slice(0, i)
    let afterChangedEl = currentIngredients.slice(i + 1)

    let objToChange = currentIngredients[i]
    let changedObj = {
      ...objToChange,
      [field]: e.target.value
    }

    let newIngredientsArr = beforeChangedEl.concat([changedObj]).concat(afterChangedEl)

    this.setState({
      ingredients: newIngredientsArr
    })
  }

  handleGrpHeadingChange (e, groupIndex) {
    let targetedGroup = this.state.groups[groupIndex]

    let changedObj = {
      ...targetedGroup,
      groupHeading: e.target.value
    }

    let groupsBeforeEl = this.state.groups.slice(0, groupIndex)
    let groupsAfterEl = this.state.groups.slice(groupIndex + 1)

    let newGroupsArr = groupsBeforeEl.concat([changedObj]).concat(groupsAfterEl)

    this.setState({
      groups: newGroupsArr
    })
  }

  handleGrpIngredientChange (e, groupIndex, ingredientIndex, field) {
    let deepClonedGroupsArr = JSON.parse(JSON.stringify(this.state.groups))

    let targetedGroup = deepClonedGroupsArr[groupIndex]
    let targetedItemsArr = targetedGroup.groupedItems

    let targetedRow = targetedItemsArr[ingredientIndex]
    let modifiedRow = {
      ...targetedRow,
      [field]: e.target.value
    }

    let rowsBeforeTarget = targetedItemsArr.slice(0, ingredientIndex)
    let rowsAfterTarget = targetedItemsArr.slice(ingredientIndex + 1)

    let modifiedGroup = {
      ...targetedGroup,
      groupedItems: rowsBeforeTarget.concat([modifiedRow]).concat(rowsAfterTarget)
    }

    let groupsBeforeTarget = deepClonedGroupsArr.slice(0, groupIndex)
    let groupsAfterTarget = deepClonedGroupsArr.slice(groupIndex + 1)

    let finalGroupsArr = groupsBeforeTarget.concat([modifiedGroup]).concat(groupsAfterTarget)

    this.setState({
      groups: finalGroupsArr
    })
  }

  handleStepChange (e, i) {
    let currentInstructions = this.state.instructions

    let beforeChangedStep = currentInstructions.slice(0, i)
    let changedStep = [e.target.value]
    let afterChangedStep = currentInstructions.slice(i + 1)

    let newInstructions = beforeChangedStep.concat(changedStep).concat(afterChangedStep)

    this.setState({
      instructions: newInstructions
    })
  }

  removeIndivIngredient (i) {
    let newIngredientsArr = this.state.ingredients.filter((obj, index) => {
      return index !== i
    })

    this.setState({
      ingredients: newIngredientsArr
    })
  }

  addIndivIngredient () {
    this.setState({
      ingredients: this.state.ingredients.concat([{name: '', amount: ''}])
    })
  }

  addGroup () {
    this.setState({
      groups: this.state.groups.concat([
        {
          groupHeading: '',
          groupedItems: [{name: '', amount: ''}]
        }
      ])
    })
  }

  addGrpIngredient (groupIndex) {
    let deepClonedGroupsArr = JSON.parse(JSON.stringify(this.state.groups))

    let targetedGroup = deepClonedGroupsArr[groupIndex]
    let groupedItemsArr = targetedGroup.groupedItems

    let modifiedGroup = {
      ...targetedGroup,
      groupedItems: groupedItemsArr.concat([{name: '', amount: ''}])
    }

    let groupsBeforeEl = deepClonedGroupsArr.slice(0, groupIndex)
    let groupsAfterEl = deepClonedGroupsArr.slice(groupIndex + 1)

    let finalGroupsArr = groupsBeforeEl.concat(modifiedGroup).concat(groupsAfterEl)

    this.setState({
      groups: finalGroupsArr
    })
  }

  removeGrpIngredient (groupIndex, ingredientIndex) {
    let deepClonedGroupsArr = JSON.parse(JSON.stringify(this.state.groups))

    let targetedGroup = deepClonedGroupsArr[groupIndex]
    let groupedItemsArr = targetedGroup.groupedItems

    let modifiedItemsArr = groupedItemsArr.filter((item, i) => {
      return i !== ingredientIndex
    })

    let modifiedGroup = {
      ...targetedGroup,
      groupedItems: modifiedItemsArr
    }

    let groupsBeforeEl = deepClonedGroupsArr.slice(0, groupIndex)
    let groupsAfterEl = deepClonedGroupsArr.slice(groupIndex + 1)

    let finalGroupsArr = groupsBeforeEl.concat([modifiedGroup]).concat(groupsAfterEl)

    this.setState({
      groups: finalGroupsArr
    })
  }

  deleteGroup (i) {
    let currentGroups = this.state.groups
    this.setState({
      groups: currentGroups.filter((obj, index) => {
        return index !== i
      })
    })
  }

  removeStep (i) {
    let currentInstructions = this.state.instructions

    this.setState({
      instructions: currentInstructions.filter((str, index) => {
        return index !== i
      })
    })
  }

  addStep () {
    let currentInstructions = this.state.instructions
    this.setState({
      instructions: currentInstructions.concat([''])
    })
  }

  uploadCoverPhoto (e) {
    let files = e.target.files
    // FileList is not an Array. Make it an array in es6.
    let filesArr = Array.from(files)

    let coverPhotoFile = filesArr[0]

    let endpoint = `https://api.cloudinary.com/v1_1/rebeccatay92/auto/upload`

    let fd = new FormData()
    fd.append('upload_preset', 'hmctu9xo')
    fd.append('file', coverPhotoFile)

    window.fetch(endpoint, {
      method: 'POST',
      body: fd
    })
      .then(res => {
        console.log('res', res)
        return res.json()
      })
      .then(json => {
        console.log('json', json)
        this.setState({
          coverPhotoUrl: json.url
        })
      })
  }

  createNewRecipe () {
    console.log('valid recipe', this.state)

    window.fetch('http://localhost:3001/recipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: 'seededuser',
        recipe: this.state
      })
    })
      .then(res => {
        console.log('res', res)
      })
  }

  render () {
    return (
      <Row style={{minHeight: '100vh'}}>
        <Col md='12' lg={{size: 6, offset: 3}}>

          <div style={{margin: '24px 0'}}>
            <h1>Create a recipe</h1>
            <h4>Share your recipe with the community</h4>
          </div>

          <Row noGutters>
            <Col sm='12'>
              <AvForm onValidSubmit={() => this.createNewRecipe()} onInvalidSubmit={() => console.log('invalid')}>
                <AvGroup>
                  <Label for='recipeTitle'>Title</Label>
                  <AvInput id='recipeTitle' placeholder="Your recipe's title" name='recipeTitle' value={this.state.recipeTitle} onChange={e => this.handleChange(e, 'recipeTitle')} required />
                  <AvFeedback>Your recipe needs a title</AvFeedback>
                </AvGroup>
                <Row>
                  <AvGroup className='col-6'>
                    <Label for='servings'>Servings</Label>
                    <AvInput required id='servings' name='servings' placeholder='No. of servings' value={this.state.servings} onChange={e => this.handleChange(e, 'servings')} />
                    <AvFeedback>Required</AvFeedback>
                  </AvGroup>
                  <AvGroup className='col-6'>
                    <Label for='time'>Time needed</Label>
                    <AvInput required id='time' name='time' value={this.state.time} onChange={e => this.handleChange(e, 'time')} />
                    <AvFeedback>Required</AvFeedback>
                  </AvGroup>
                </Row>

                <ButtonGroup size='lg' style={{marginBottom: '1rem'}} className='d-flex'>
                  <Button outline color='success' active={this.state.vegCategory === 'Vegan'} style={{flex: 1}} onClick={() => this.setState({vegCategory: 'Vegan'})}>Vegan</Button>
                  <Button outline color='success' active={this.state.vegCategory === 'Vegetarian'} style={{flex: 1}} onClick={() => this.setState({vegCategory: 'Vegetarian'})}>Vegetarian</Button>
                </ButtonGroup>

                <AvGroup>
                  <Label for='coverPhoto'>Upload a cover photo</Label>
                  <AvInput id='coverPhoto' name='coverPhotoUrl' type='file' onChange={e => this.uploadCoverPhoto(e)} accept='.jpg, .jpeg, .png' required />
                  <AvFeedback>You need a photo for your recipe</AvFeedback>
                </AvGroup>

                <div style={{width: '100%', height: '350px'}}>
                  <img className='img-fluid' alt='coverphoto' src={this.state.coverPhotoUrl || 'http://via.placeholder.com/540x350'} style={{width: '100%', height: '100%', maxWidth: '100%', maxHeight: '100%', objectFit: 'cover'}} />
                </div>
                <hr />

                <h3>Ingredients needed</h3>
                {this.state.ingredients.map((row, i) => {
                  return (
                    <Row key={i}>
                      <AvGroup className='col-7'>
                        <Label for={`ingredient${i}`}>Ingredient</Label>
                        <AvInput id={`ingredient${i}`} name={`ingredient${i}`} value={row.name} onChange={e => this.handleIndivIngredientChange(e, i, 'name')} required />
                        <AvFeedback>Required</AvFeedback>
                      </AvGroup>
                      <FormGroup className='col-4'>
                        <Label for={`ingredient${i}amount`}>Amount</Label>
                        <Input id={`ingredient${i}amount`} value={row.amount} onChange={e => this.handleIndivIngredientChange(e, i, 'amount')} />
                      </FormGroup>
                      <div className='col-1 d-flex justify-content-end align-items-end' style={{marginBottom: '1rem'}}>
                        <Button color='primary' size='md' onClick={() => this.removeIndivIngredient(i)}>X</Button>
                      </div>
                    </Row>
                  )
                })}

                <Button block outline color='primary' style={{marginTop: '1rem'}} onClick={() => this.addIndivIngredient()}>Add new row</Button>

                <Button block outline color='primary' style={{marginTop: '1rem'}} onClick={() => this.addGroup()}>Add a group of ingredients</Button>

                {this.state.groups.map((group, groupIndex) => {
                  return (
                    <div key={groupIndex} style={{background: 'rgb(245, 245, 245)', boxShadow: '2px 2px 10px rgb(210, 210, 210)', margin: '24px 0', padding: '12px'}}>
                      <AvGroup>
                        <Label for={`groupHeading${groupIndex}`}>Group Heading</Label>
                        <AvInput name={`groupHeading${groupIndex}`} id={`groupHeading${groupIndex}`} value={group.groupHeading} onChange={e => this.handleGrpHeadingChange(e, groupIndex)} required />
                        <AvFeedback>Required</AvFeedback>
                      </AvGroup>
                      {group.groupedItems.map((obj, ingredientIndex) => {
                        return (
                          <Row key={ingredientIndex}>
                            <AvGroup className='col-7'>
                              <Label for={`group${groupIndex}ingredient${ingredientIndex}`}>Ingredient</Label>
                              <AvInput id={`group${groupIndex}ingredient${ingredientIndex}`} value={obj.name} name={`group${groupIndex}ingredient${ingredientIndex}`} onChange={e => this.handleGrpIngredientChange(e, groupIndex, ingredientIndex, 'name')} required />
                              <AvFeedback>Required</AvFeedback>
                            </AvGroup>
                            <FormGroup className='col-4'>
                              <Label for={`group${groupIndex}ingredient${ingredientIndex}amount`}>Amount</Label>
                              <Input id={`group${groupIndex}ingredient${ingredientIndex}amount`} value={obj.amount} onChange={e => this.handleGrpIngredientChange(e, groupIndex, ingredientIndex, 'amount')} />
                            </FormGroup>
                            <div className='col-1 d-flex justify-content-end align-items-end' style={{marginBottom: '1rem'}}>
                              <Button color='primary' size='md' onClick={() => this.removeGrpIngredient(groupIndex, ingredientIndex)}>X</Button>
                            </div>
                          </Row>
                        )
                      })}
                      <Button block outline color='primary' style={{marginTop: '1rem'}} onClick={() => this.addGrpIngredient(groupIndex)}>Add new row</Button>
                      <Button block outline color='danger' style={{marginTop: '1rem'}} onClick={() => this.deleteGroup(groupIndex)}>Delete this group</Button>
                    </div>
                  )
                })}

                <hr />

                <h3>Instructions</h3>
                {this.state.instructions.map((step, i) => {
                  return (
                    <Row key={i}>
                      <AvGroup className='col-11'>
                        <Label for={`step${i}`}>Step {i + 1}</Label>
                        <AvInput id={`step${i}`} name={`step${i}`}  type='textarea' value={step} onChange={e => this.handleStepChange(e, i)} required />
                        <AvFeedback>Required</AvFeedback>
                      </AvGroup>
                      <div className='col-1 d-flex justify-content-end align-items-end' style={{marginBottom: '1rem'}}>
                        <Button color='primary' size='md' onClick={() => this.removeStep(i)}>X</Button>
                      </div>
                    </Row>
                  )
                })}
                <Button block outline color='primary' style={{marginTop: '1rem'}} onClick={() => this.addStep()}>Add a step</Button>

                <Button block size='lg' color='success' style={{marginTop: '3rem', marginBottom: '6rem'}}>Submit this recipe</Button>
              </AvForm>
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}

export default CreateRecipe
