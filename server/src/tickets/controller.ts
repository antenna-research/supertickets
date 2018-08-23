import { JsonController, Get, Param, Post, HttpCode, Body, Put, NotFoundError, CurrentUser, ForbiddenError } from 'routing-controllers'
// import { getRepository } from 'typeorm'
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
    const thisEvent = await Event.findOneById( id )
    if (!thisEvent) throw new NotFoundError(`Event does not exist`)

    if (thisEvent.tickets && thisEvent.tickets.length > 0) {
      const averagePrice = thisEvent.tickets.reduce( (total=0, ticket) => { return total + Number(ticket.price) }, 0 ) / thisEvent.tickets.length      
      const assessedTickets = await assessTickets(thisEvent.tickets, averagePrice)
      return { ...thisEvent, tickets: assessedTickets }
    }
    // return thisEvent
  }

  @Get('/tickets/:id')
  async getTicket(
    @Param('id') ticketId: any
  ) {
    const thisTicket = await Ticket.findOneById( ticketId )
    return assessTicket(thisTicket)
  }

  // As a *logged in* customer I want to add a ticket (for a specific event) 
  //   that shows up on the event page with a title, picture, price and description
  // @Authorized()
  @Post('/tickets/:id')
  @HttpCode(201)
  async createTicket(
    @Body() ticket: Ticket,
    @Param('id') eventId, //: number,
    @CurrentUser() user: User
  ) {
    const thisEvent = await Event.findOneById( eventId )
    if (!thisEvent) throw new NotFoundError(`Event does not exist`)

    ticket.event = thisEvent
    ticket.user = user
    ticket.price = parseFloat(ticket.price.toString())
    return ticket.save()
  }

  // As an author of the ticket I want to be able to edit a ticket's description, price and picture
  //   (other logged in customers cannot do this! only authors and admins)
  // @Authorized()
  @Put('/tickets/:id')
  async updateTicket(
    @Param('id') id, //: number,
    @Body() update, // : Partial<Ticket> | undefined
    @CurrentUser() user: User
  ) {
    const ticket = await Ticket.findOneById(id)
    if (!ticket) throw new NotFoundError('Cannot find ticket')
    if (ticket.user !== user) throw new ForbiddenError('You can only edit your own content!')

    return Ticket.merge(ticket, update).save()
  }


  @Post('/comments/:id')
  @HttpCode(201)
  async createComment(
    @Body() comment: Comment,
    @Param('id') ticketId, //: number,
    @CurrentUser() user: User
  ) {
    const thisTicket = await Ticket.findOneById( ticketId )
    if (!thisTicket) throw new NotFoundError(`Event does not exist`)

    comment.ticket = thisTicket
    comment.user = user
    return comment.save()
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
