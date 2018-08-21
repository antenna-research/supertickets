import {GET_EVENTS} from '../actions/events'

export default function (state = [], action) {
  switch (action.type) {
    case GET_EVENTS:
      return action.payload
    default:
      return state
  }
}