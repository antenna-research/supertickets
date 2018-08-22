import {GET_TICKET_DETAILS, UPDATE_TICKET, ADD_COMMENT} from '../actions/tickets'

export default function (state = null, action) {
  switch (action.type) {
    case GET_TICKET_DETAILS:
      return action.payload
    case UPDATE_TICKET:
      return action.payload
    case ADD_COMMENT:
      const newComments = [...state.comments, action.payload]
      return { ...state, comments: newComments }
    default:
      return state
  }
}