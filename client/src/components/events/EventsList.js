import React, {PureComponent} from 'react'
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {userId} from '../../jwt'
import {getEvents} from '../../actions/events'

class EventsList extends PureComponent {

  componentWillMount(props) {
    this.props.getEvents()
  }

  render() {
    return (<div>
      Events List
    </div>)
  }

}

const mapStateToProps = function (state, props) {
  return {
    events: state.events,
  }
}

export default connect(mapStateToProps, { getEvents })( EventsList )
