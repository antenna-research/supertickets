import React, {PureComponent} from 'react'
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {userId} from '../../jwt'
// import {getEvent} from '../../actions/events'
import {getTickets} from '../../actions/tickets'

class TicketsList extends PureComponent {

  componentWillMount() {
    this.props.getTickets( this.props.match.params.id )
  }

  render() {
    if (this.props.event === null) return 'Loading...'

    const tickets = this.props.event.tickets
    return (<div>
      <h2>{ this.props.event.name }</h2>
      <h3>{ this.props.event.startDate } to { this.props.event.endDate }</h3>
      <ul>
      { tickets.map( 
        ticket => <li><a href={ `/ticket/${ticket.id}` }> { ticket.description } </a></li>
      )}
      </ul>

      Tickets List
    </div>)
  }

}

const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
  userId: state.currentUser && userId(state.currentUser.jwt),
  event: state.event
})

export default connect(mapStateToProps, { getTickets })( TicketsList )
