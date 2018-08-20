import React from 'react'
import {withRouter} from 'react-router'
import {userId} from '../../jwt'
import {connect} from 'react-redux'

const TopBar = (props) => {
  const { location, history, user } = props

  return (<div position="absolute" style={{zIndex:10}}>
    <div>
      <span variant="title" color="inherit" style={{flex: 1}}>
        Super Tickets
      </span>
      {
        user &&
        <button color="inherit"> { user.firstName }</button>
      }

      {
        location.pathname.indexOf('signup') > 0 &&
        <button color="inherit" onClick={() => history.push('/login')}>Login</button>
      }
      {
        location.pathname.indexOf('login') > 0 &&
        <button color="inherit" onClick={() => history.push('/signup')}>Sign up</button>
      }
      {
        // /games$/.test(location.pathname) &&
        // <Button color="inherit" onClick={() => history.push('/logout')}>Log out</Button>
      }
    </div>
  </div>)
}

const mapStateToProps = state => ({
  user: state.currentUser && state.users &&
    state.users[userId(state.currentUser.jwt)]
})

export default withRouter(
  connect(mapStateToProps)(TopBar)
)

