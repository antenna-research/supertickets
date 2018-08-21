import React, {PureComponent} from 'react'
import {addTicket, getTickets} from '../../actions/tickets'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom';

class AddTicketForm extends PureComponent {
  state = {}

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addTicket(parseInt(this.props.eventId), this.state)
    this.setState({ picture: '', price: '', description: '' }) 
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
      <form onSubmit={this.handleSubmit}>

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

const mapStateToProps = function (state, props) {
  return {
    // adverts: state.adverts,
  }
}

export default connect(mapStateToProps, { addTicket, getTickets })( withRouter(AddTicketForm) )
// export default connect(mapStateToProps, { addTicket, getTickets })( AddTicketForm )