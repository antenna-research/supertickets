import React, {PureComponent} from 'react'
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getEvents} from '../../actions/events'

class EventsList extends PureComponent {

  componentWillMount() {
    this.props.getEvents()
  }

  render() {
    return (<div><ul>
      { this.props.events.map(
        (event) => <li key={`${event.id}`}><a href={ `/event/${event.id}` }> { event.name }, { event.startDate }, { event.endDate } </a></li>
      )}
    </ul>

    { this.props.authenticated &&
      <div>
        <a href="/event/add">Add an event</a>
      </div>
    }


    </div>)
  }

}

const mapStateToProps = function (state, props) {
  return {
    events: state.events,
    authenticated: state.currentUser !== null,
    // userId: state.currentUser && userId(state.currentUser.jwt),
  }
}

export default connect(mapStateToProps, { getEvents })( EventsList )
