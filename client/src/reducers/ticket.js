import {GET_TICKET_DETAILS} from '../actions/tickets'
import {UPDATE_TICKET} from '../actions/tickets'

export default function (state = null, action) {
  switch (action.type) {
    case GET_TICKET_DETAILS:
      return action.payload
    case UPDATE_TICKET:
      return action.payload
    default:
      return state
  }
}