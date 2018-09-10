import Ticket from './entity'

const assessRisk = (priceRatio, isOnlyTicketFromUser, ticketCreated, numberComments) => {
  let risk = 0.4

  // if this ticket is the only ticket of the author, add 4%
  if (isOnlyTicketFromUser) { risk += 0.04 }

  // if a ticket is X% cheaper than the average price, add X% to the risk
  if (priceRatio < 1.00) { risk += (1.00 - priceRatio) }

  // if a ticket is X% more expensive than the average price, deduct X% from the risk, with a maximum of 15% deduction
  if (priceRatio > 1.00) { risk -= ( Math.min(priceRatio - 1.00, 0.15) ) }

  // if the ticket was added during business hours (9-17), deduct 13% from the risk, if not, add 13% to the risk
  if (9 <= ticketCreated && ticketCreated < 17) { risk -= 0.13 } else { risk += 0.13 }

  // if there are >3 comments on the ticket, add 6% to the risk
  if (numberComments > 3) { risk += 0.06 }

  // The minimum risk is 2% and the maximum risk is 98%.
  risk = Math.max(risk, 0.02)
  risk = Math.min(risk, 0.98)

  return Math.round(risk*100)
}

export const assessTicket = async (ticket) => {

  const priceRatio = await Ticket.find({ where: { event_id: ticket.event_id } })
    .then( otherTickets => otherTickets.reduce( (total, thisTicket) => total + Number(thisTicket.price), 0 ) / otherTickets.length )
    .then( averagePrice => parseFloat(ticket.price) / averagePrice )
  const isOnlyTicketFromUser = await Ticket
    .find({ where: { user_id: ticket.user_id } })
    .then( (userTickets) => userTickets.length === 1 )
  const ticketCreated = ticket.created_at.getHours()
  const numberComments = ticket.comments ? ticket.comments.length : 0
  const risk = assessRisk(priceRatio, isOnlyTicketFromUser, ticketCreated, numberComments)

  return { ...ticket, risk }
}

export const assessTickets = async (tickets, averagePrice) => {
  const assessments = tickets.map( 
    async (ticket) => {
      const priceRatio = parseFloat(ticket.price) / averagePrice
      const isOnlyTicketFromUser = await Ticket
        .find({ where: { user_id: ticket.user_id } })
        .then( (userTickets) => userTickets.length === 1 )
      const ticketCreated = ticket.created_at.getHours()
      const numberComments = ticket.comments ? ticket.comments.length : 0
      return assessRisk(priceRatio, isOnlyTicketFromUser, ticketCreated, numberComments)
    }
  )
  return Promise.all(assessments).then(function(values) {
    return tickets.map( (ticket, i) => { return {...ticket, risk:values[i] } })
  })
}





