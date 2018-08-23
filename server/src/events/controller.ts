import { JsonController, Get, Post, HttpCode, Body, CurrentUser, Authorized } from 'routing-controllers'
import Event from './entity'
import User from '../users/entity'
import { getManager, Not, LessThan } from 'typeorm'

@JsonController()
export default class EventController {

  @Get('/events')
  async allEvents() {
    const entityManager = getManager();
    let today = new Date()
    today.setHours(0,0,0,0)
    const events = await entityManager.find(Event, {
      endDate: Not(LessThan(today))
    })
    return events
  }

  @Authorized()
  @Post('/events')
  @HttpCode(201)
  createEvent(
    @Body() event: Event,
    @CurrentUser() user: User
  ) {
    event.tickets = []
    event.endDate = new Date(event.endDate)
    return event.save()
  }

}
