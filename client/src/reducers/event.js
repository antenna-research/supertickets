import { GET_EVENT, ADD_TICKET } from '../actions/tickets'
import { ADD_EVENT } from '../actions/events'

export default function (state = null, action) {
  switch (action.type) {
    case GET_EVENT:
      return action.payload
    case ADD_EVENT:
      return action.payload
    case ADD_TICKET:
      const newTickets = [...state.tickets, action.payload]
      return { ...state, tickets: newTickets }
    default:
      return state
  }
}