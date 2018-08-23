import React, {PureComponent} from 'react'
import {addTicket,updateTicket} from '../../actions/tickets'
import {connect} from 'react-redux'

class AddTicketForm extends PureComponent {
  state = {}

  submitNew = (e) => {
    e.preventDefault()
    this.props.addTicket(this.props.eventId, this.state)
    this.setState({ picture: '', price: '', description: '' })
    this.props.reset()
  }

  submitUpdate = (e) => {
    e.preventDefault()
    this.props.updateTicket(this.props.ticketId, this.state)
    this.props.reset()
  }

  handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  }

  render() {
    const initialValues = this.props.initialValues || {}
    return (
      <form onSubmit={this[this.props.submitFunction]}>

        <div>
          <label htmlFor="picture">Image url</label>
          <input type="text" name="picture" id="picture" value={
            this.state.picture !== undefined ? this.state.picture : initialValues.picture
          } onChange={ this.handleChange } />
        </div>

        <div>
          <label htmlFor="price">Price</label>
          <input type="text" name="price" id="price" value={
            this.state.price !== undefined ? this.state.price : initialValues.price
          } onChange={ this.handleChange } />
        </div>

        <div>
          <label htmlFor="description" style={{ textAlign: "left" }}>Description</label><br/>
          <textarea id="description" name="description" rows="4" columns="50" maxLength="200" wrap="hard" value={
            this.state.description !== undefined ? this.state.description : initialValues.description
          } onChange={ this.handleChange } />
        </div>

        <button type="submit">Save</button>
      </form>
    )
  }
}

export default connect(null, { addTicket, updateTicket })( AddTicketForm )
