import React, {PureComponent} from 'react'
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getTicketDetails} from '../../actions/tickets'
import AddCommentForm from './AddCommentForm'

class TicketDetail extends PureComponent {
  state = {
    showComponent: false,
  }

  _onButtonClick = () => {
    this.setState({
      showComponent: true,
    });
  }

  componentWillMount(props) {
    this.props.getTicketDetails( this.props.match.params.id )
  }

  render() {
    if (this.props.ticket === null) return 'Loading...'

    // On the ticket page for a specific ticket, we want to show a text like:
    // "We calculated that the risk of this ticket being a fraud is XX%"

    return (<div>
      <h2>{this.props.ticket.description}</h2>
      <h3>{this.props.ticket.image}</h3>
      <h3>{this.props.ticket.price}</h3>
      <p className="risk-assessment">We calculated that the risk of this ticket being a fraud is { this.props.ticket.risk }%</p>

      { this.props.ticket.comments && this.props.ticket.comments.length > 0 &&
        this.props.ticket.comments.map(
          comment => <div className='comment-wrapper' key={comment.id}>
            {comment.body}
          </div>
      )}

      { this.props.authenticated &&
        !this.state.showComponent &&
        <button onClick={this._onButtonClick}>Add a comment for this event</button>
      }
      { this.props.authenticated &&
        this.state.showComponent &&
        <AddCommentForm ticketId={this.props.match.params.id} />
      }
    </div>)
  }

}

const mapStateToProps = function (state, props) {
  return {
    authenticated: state.currentUser !== null,
    ticket: state.ticket,
  }
}

export default connect(mapStateToProps, { getTicketDetails })( TicketDetail )
