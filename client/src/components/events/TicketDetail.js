import React, {PureComponent} from 'react'
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {userId} from '../../jwt'
import {getTicketDetails} from '../../actions/tickets'
import AddCommentForm from './AddCommentForm'
import AddTicketForm from './AddTicketForm'

class TicketDetail extends PureComponent {
  state = {
    showCommentForm: false,
    showTicketForm: false
  }

  _showCommentForm = () => {
    this.setState({ showCommentForm: true });
  }

  _showTicketForm = () => {
    this.setState({ showTicketForm: true });
  }

  _reset = () => {
    this.setState({ showTicketForm: false });
  }

  componentWillMount(props) {
    this.props.getTicketDetails( this.props.match.params.id )
  }

  render() {

    const ticket = this.props.ticket
    const authenticated = this.props.authenticated
    if (ticket === null) return 'Loading...'

    return (<div>
      <h4>Ticket Detail</h4>
      <h3>{ticket.description}</h3>
      <h3>Price: €{Number(ticket.price).toFixed(2) }</h3>
      { ticket.risk &&
        <p className="risk-assessment">We calculated that the risk of this ticket being a fraud is { ticket.risk }%</p>        
      }

      { ticket.comments && ticket.comments.length > 0 &&
        <div className="comments">
        <h4>Comments</h4>
          {
          ticket.comments.map(
            comment => <div className='comment-wrapper' key={comment.id}>
              {comment.body}
            </div>
          )}
        </div>
      }

      { authenticated && (ticket.user_id === this.props.userId) && !this.state.showTicketForm &&
        <button onClick={this._showTicketForm}>Edit your ticket</button>
      }
      { authenticated && (ticket.user_id === this.props.userId) && this.state.showTicketForm &&
        <AddTicketForm ticketId={this.props.match.params.id} submitFunction={'submitUpdate'} initialValues={ticket} reset={this._reset} />
      }


      { authenticated &&
        <AddCommentForm ticketId={this.props.match.params.id} isFormVisible={this.state.showCommentForm} showForm={this._showCommentForm} />
      }

    </div>)
  }

}

const mapStateToProps = function (state, props) {
  return {
    authenticated: state.currentUser !== null,
    userId: state.currentUser && userId(state.currentUser.jwt),
    ticket: state.ticket,
  }
}

export default connect(mapStateToProps, { getTicketDetails })( TicketDetail )
