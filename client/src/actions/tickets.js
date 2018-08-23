import * as request from 'superagent'
import {baseUrl} from '../constants'
import {logout} from './users'
import {isExpired} from '../jwt'

export const GET_TICKETS = 'GET_TICKETS'
export const GET_TICKET_DETAILS = 'GET_TICKET_DETAILS'
export const ADD_TICKET = 'ADD_TICKET'
export const UPDATE_TICKET = 'UPDATE_TICKET'
export const GET_EVENT = 'GET_EVENT'
export const ADD_COMMENT = 'ADD_COMMENT'

// export const REMOVE_TICKET = 'REMOVE_TICKET'

export const getTickets = (eventId) => (dispatch) => {
  request
    .get(`${baseUrl}/events/${eventId}`)
    .then(response => dispatch({
      type: GET_EVENT,
      payload: response.body
    }))
    .catch(err => alert(err))
}

export const getTicketDetails = (ticketId) => (dispatch) => {
  request
    .get(`${baseUrl}/tickets/${ticketId}`)
    .then(response => dispatch({
      type: GET_TICKET_DETAILS,
      payload: response.body
    }))
    .catch(err => alert(err))
}

export const addTicket = (eventId, ticket) => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .post(`${baseUrl}/tickets/${eventId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(ticket)
    .then(response => {
      dispatch({
        type: ADD_TICKET,
        payload: response.body
      })
    })
    .catch(err => alert(err))
}


export const addComment = (ticketId, comment) => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .post(`${baseUrl}/comments/${ticketId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(comment)
    .then(response => {
      dispatch({
        type: ADD_COMMENT,
        payload: response.body
      })
    })
    .catch(err => alert(err))
}


export const updateTicket = (ticketId, updates) => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .put(`${baseUrl}/tickets/${ticketId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(updates)
    .then(response => {
      dispatch({
        type: UPDATE_TICKET,
        payload: response.body
      })
    })
    .catch(err => alert(err))

}


// export const deleteProduct = (ticketId) => (dispatch) => {
//   request
//     .delete(`${baseUrl}/products/${productId}`)
//     .then(response => {
//       dispatch({
//         type: REMOVE_PRODUCT,
//         payload: productId
//       })
//     })
//     .catch(err => alert(err))
// }

