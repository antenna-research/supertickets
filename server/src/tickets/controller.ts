import { JsonController, Get, Param, Post, HttpCode, Body, Put, NotFoundError, CurrentUser, ForbiddenError, Authorized } from 'routing-controllers'
import Ticket, { Comment } from './entity'
import Event from '../events/entity'
import User from '../users/entity'
import { assessTickets, assessTicket } from './assessRisk'

@JsonController()
export default class TicketController {

  @Get('/events/:id')
  async getTickets(
    @Param('id') id: any,
    @CurrentUser() user: User
  ) {
    const thisEvent = await Event.findOne( id )
    if (!thisEvent) throw new NotFoundError(`Event does not exist`)

    if (thisEvent.tickets && thisEvent.tickets.length > 0) {
      const averagePrice = thisEvent.tickets.reduce( (total=0, ticket) => { return total + Number(ticket.price) }, 0 ) / thisEvent.tickets.length      
      const assessedTickets = await assessTickets(thisEvent.tickets, averagePrice)
      return { ...thisEvent, tickets: assessedTickets }
    }
    return thisEvent
  }

  @Get('/tickets/:id')
  async getTicket(
    @Param('id') ticketId: any
  ) {
    const thisTicket = await Ticket.findOne( ticketId )
    return assessTicket(thisTicket)
  }

  @Authorized()
  @Post('/tickets/:id')
  @HttpCode(201)
  async createTicket(
    @Body() ticket: Ticket,
    @Param('id') eventId,
    @CurrentUser() user: User
  ) {
    const thisEvent = await Event.findOne( eventId )
    if (!thisEvent) throw new NotFoundError(`Event does not exist`)

    ticket.event = thisEvent
    ticket.user = user
    ticket.price = parseFloat(ticket.price.toString())
    return ticket.save()
  }

  @Authorized()
  @Put('/tickets/:id')
  async updateTicket(
    @Param('id') id,
    @Body() update,
    @CurrentUser() user: User
  ) {
    const ticket = await Ticket.findOne(id)
    if (!ticket) throw new NotFoundError('Cannot find ticket')
    if (ticket.user_id !== user.id) throw new ForbiddenError('You can only edit your own content!')
    Object.keys(ticket).forEach( (key)=>{
      if (update[key]) {
        ticket[key] = update[key]
      }
    })
    ticket.save()
    return assessTicket(ticket)
  }


  @Post('/comments/:id')
  @HttpCode(201)
  async createComment(
    @Body() comment: Comment,
    @Param('id') ticketId,
    @CurrentUser() user: User
  ) {
    const thisTicket = await Ticket.findOne( ticketId )
    if (!thisTicket) throw new NotFoundError(`Event does not exist`)

    comment.ticket = thisTicket
    comment.user = user
    return comment.save()
  }

}