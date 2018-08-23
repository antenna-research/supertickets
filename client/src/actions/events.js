import * as request from 'superagent'
import {baseUrl} from '../constants'
import {logout} from './users'
import {isExpired} from '../jwt'

export const GET_EVENTS = 'GET_EVENTS'
export const ADD_EVENT = 'ADD_EVENT'

export const getEvents = () => (dispatch) => {
  request
    .get(`${baseUrl}/events`)
    .then(response => dispatch({
      type: GET_EVENTS,
      payload: response.body
    }))
    .catch(err => alert(err))
}

export const addEvent = (event) => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .post(`${baseUrl}/events`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(event)
    .then(response => {
      dispatch({
        type: ADD_EVENT,
        payload: response.body
      })
    })
    .catch(err => alert(err))
}




