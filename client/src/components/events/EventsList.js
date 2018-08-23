import React, {PureComponent} from 'react'
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getEvents} from '../../actions/events'
import dateFormat from 'dateformat'

class EventsList extends PureComponent {
  state = {
    page: 1,
    isLastPage: false
  }

  _forwardClick = () => {
    if (!this.state.isLastPage) {
      const newPage = this.state.page+1
      if (newPage*4 >= this.props.events.length) {
        this.setState({ page: newPage, isLastPage: true })
      } else {
        this.setState({ page: newPage, isLastPage: false })
      }
    }
  }

  _backwardClick = () => {
    if (this.state.page > 1) {
      const newPage = this.state.page-1
      if (newPage*4 >= this.props.events.length) {
        this.setState({ page: newPage, isLastPage: true })
      } else {
        this.setState({ page: newPage, isLastPage: false })
      }
    }
  }

  componentWillMount() {
    this.props.getEvents()
  }

  render() {
    const firstEvent = (this.state.page-1) * 4
    const lastEvent = Math.min(this.state.page*4, this.props.events.length)
    return (<div><ul className='app-list'>
      { this.props.events.slice(firstEvent, lastEvent).map(
        (event) => <li key={`${event.id}`}>
          <a href={ `/event/${event.id}` }>
            <span className="event-name">{ event.name }</span>
            <span className="event-date">{ dateFormat(event.startDate, "mmmm d") } &ndash; { dateFormat(event.endDate, "mmmm d, yyyy") }</span>
          </a>
        </li>
      )}
    </ul>

    <div className="event-pagination">
      <button className="prev" onClick={this._backwardClick}>&#8592;</button>
      <button className="next" onClick={this._forwardClick}>&#8594;</button>
    </div>

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
  }
}

export default connect(mapStateToProps, { getEvents })( EventsList )
