import React, {PureComponent} from 'react'
import {addComment} from '../../actions/tickets'
import {connect} from 'react-redux'

class AddCommentForm extends PureComponent {
  state = {}

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addComment(this.props.ticketId, this.state)
    this.setState({ body: '' }) 
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
          <label htmlFor="body" style={{ textAlign: "left" }}>Comment</label><br/>
          <textarea id="body" name="body" rows="4" columns="50" maxLength="200" wrap="hard" value={
            this.state.body !== undefined ? this.state.body : initialValues.body
          } onChange={ this.handleChange } />
        </div>

        <button type="submit">Save</button>
      </form>
    )
  }
}

export default connect(null, { addComment })( AddCommentForm )
