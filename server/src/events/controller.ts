import { JsonController, Get, Post, HttpCode, Body, CurrentUser } from 'routing-controllers'
import Event from './entity'
import User from '../users/entity'

@JsonController()
export default class EventController {

  // As a customer I want to see max. 4 events on a page
  //   and be able to click 'next' to see more pages of events if there are more.
  @Get('/events')
  async allEvents() {
    const events = await Event.find()
    return { events }
  }

  // As a logged in customer I want to be able to create events
  //   with a name, picture (logo), date and description
  // @Authorized()
  @Post('/events')
  @HttpCode(201)
  createEvent(
    @Body() event: Event,
    @CurrentUser() user: User
  ) {
    console.log('event', event)
    event.tickets = []
    return event.save()
  }

}

// routing-controllers
//   JsonController
//   Authorized
//   CurrentUser
//   Post
//   Param
//   BadRequestError
//   HttpCode
//   NotFoundError
//   ForbiddenError
//   Get
//   Body
//   Patch
//   Put
