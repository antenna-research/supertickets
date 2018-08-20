import React, {PureComponent} from 'react'
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {userId} from '../../jwt'

class EventsList extends PureComponent {

  componentWillMount(props) {
    // this.props.fetchAllAdverts()
  }

  render() {
    return (<div>
      Events List
    </div>)
  }

}

const mapStateToProps = function (state, props) {
  // return {
  //   adverts: state.adverts,
  // }
}

// export default connect(mapStateToProps, { fetchAllAdverts })( EventsList )
export default EventsList
