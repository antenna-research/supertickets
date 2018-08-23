import React, {PureComponent} from 'react'
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getEvents} from '../../actions/events'

class EventsList extends PureComponent {
  state = {
    page: 1,
    isLastPage: false
  }

  _forwardClick = () => {
    if (!this.state.isLastPage) {
      const newPage = this.state.page+1
      console.log('newPage*4', newPage*4, '<= this.props.events.length', this.props.events.length)
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
    console.log('firstEvent', firstEvent, 'lastEvent', lastEvent)
    console.log('this.props.events.slice(firstEvent, lastEvent)', this.props.events.slice(firstEvent, lastEvent))
    return (<div><ul>
      { this.props.events.slice(firstEvent, lastEvent).map(
        (event) => <li key={`${event.id}`}><a href={ `/event/${event.id}` }> { event.name }, { event.startDate }, { event.endDate } </a></li>
      )}
    </ul>

    <button onClick={this._backwardClick}>&#8592;</button>
    <button onClick={this._forwardClick}>&#8594;</button>

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
