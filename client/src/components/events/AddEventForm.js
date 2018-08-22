import React, {PureComponent} from 'react'
import {addEvent} from '../../actions/events'
import {connect} from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'

class AddEventForm extends PureComponent {
  state = {}

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addEvent(this.state)
    console.log('this.props.event', this.props.event)    
    // this.props.history.push('/event/'+   )
    // this.setState({ picture: '', price: '', description: '' }) 
  }

  handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  }

  render() {
    const initialValues = this.props.initialValues || {}
    if (this.props.event) {
      return (<Redirect to={ `/event/${this.props.event.id}` } />)
    }
    if (this.props.authenticated) {
      return (
        <div id="event-form-wrapper">
          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="name">Event Name</label>
              <input type="text" name="name" id="name" value={
                this.state.name !== undefined ? this.state.name : initialValues.name
              } onChange={ this.handleChange } />
            </div>

            <div>
              <label htmlFor="picture">Image url</label>
              <input type="text" name="picture" id="picture" value={
                this.state.picture !== undefined ? this.state.picture : initialValues.picture
              } onChange={ this.handleChange } />
            </div>

            <div>
              <label htmlFor="description" style={{ textAlign: "left" }}>Description</label><br/>
              <textarea id="description" name="description" rows="4" columns="50" maxLength="200" wrap="hard" value={
                this.state.description !== undefined ? this.state.description : initialValues.description
              } onChange={ this.handleChange } />
            </div>

            <div>
              <label htmlFor="startDate">Start Date</label>
              <input type="text" name="startDate" id="startDate" value={
                this.state.startDate !== undefined ? this.state.startDate : initialValues.startDate
              } onChange={ this.handleChange } />
            </div>

            <div>
              <label htmlFor="price">End Date</label>
              <input type="text" name="endDate" id="endDate" value={
                this.state.endDate !== undefined ? this.state.endDate : initialValues.endDate
              } onChange={ this.handleChange } />
            </div>

            <button type="submit">Save</button>
          </form>
        </div>
      )
    }
  }
}

const mapStateToProps = function (state, props) {
  return {
    authenticated: state.currentUser !== null,
    event: state.event
  }
}

export default connect(mapStateToProps, { addEvent })( withRouter(AddEventForm) )
