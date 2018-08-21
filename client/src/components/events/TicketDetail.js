import React, {PureComponent} from 'react'
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getTicketDetails} from '../../actions/tickets'

class TicketDetail extends PureComponent {

  componentWillMount(props) {
    this.props.getTicketDetails( this.props.match.params.id )
  }

  render() {
    if (this.props.ticket === null) return 'Loading...'

    return (<div>
      <h2>{this.props.ticket.description}</h2>
      <h3>{this.props.ticket.image}</h3>
      <h3>{this.props.ticket.price}</h3>

    </div>)
  }

}

const mapStateToProps = function (state, props) {
  return {
    ticket: state.ticket,
  }
}

export default connect(mapStateToProps, { getTicketDetails })( TicketDetail )
