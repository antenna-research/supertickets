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
        (event) => <li><a href={ `/event/${event.id}` }> { event.name }, { event.startDate }, { event.endDate } </a></li>
      )}
    </ul></div>)
  }

}

const mapStateToProps = function (state, props) {
  return {
    events: state.events,
  }
}

export default connect(mapStateToProps, { getEvents })( EventsList )
