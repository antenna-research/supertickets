import React, {PureComponent} from 'react'
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {userId} from '../../jwt'
import {getTickets} from '../../actions/tickets'
import AddTicketForm from './AddTicketForm'

class TicketsList extends PureComponent {
  state = {
    showComponent: false,
  }

  componentWillMount() {
    this.props.getTickets( this.props.match.params.id )
  }

  _onButtonClick = () => {
    this.setState({
      showComponent: true,
    });
  }

  render() {
    if (this.props.event === null) return 'Loading...'

    const tickets = this.props.event.tickets
    return (<div>
      <h2>{ this.props.event.name }</h2>
      <h3>{ this.props.event.startDate } to { this.props.event.endDate }</h3>
      <ul>
      { tickets.length > 0 && tickets.map( 
        ticket => {
          let riskRating
          if (ticket.risk < 40) { riskRating = 'low-risk' }
          if (ticket.risk >= 40 && ticket.risk < 68) { riskRating = 'medium-risk' }
          if (ticket.risk >= 68) { riskRating = 'high-risk' }
          return (<li key={ `${ticket.id}` }>
            <a href={ `/ticket/${ticket.id}` }>{ ticket.description }</a>
            <span className={`risk-level ${riskRating}`}> &bull;</span>
          </li>)
        }
      ) }
      </ul>

      { this.props.authenticated &&
        !this.state.showComponent &&
        <button onClick={this._onButtonClick}>List a ticket for this event</button>
      }
      { this.props.authenticated &&
        this.state.showComponent &&
        <AddTicketForm eventId={this.props.match.params.id} />
      }


    </div>)
  }

}

const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
  // userId: state.currentUser && userId(state.currentUser.jwt),
  event: state.event
})

export default connect(mapStateToProps, { getTickets })( TicketsList )
