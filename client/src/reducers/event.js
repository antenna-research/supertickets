import {GET_EVENT} from '../actions/tickets'

export default function (state = null, action) {
  switch (action.type) {
    case GET_EVENT:
      return action.payload
    default:
      return state
  }
}