import {GET_TICKETS} from '../actions/tickets'

export default function (state = [], action) {
  switch (action.type) {
    case GET_TICKETS:
      return action.payload
    default:
      return state
  }
}