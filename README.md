# Final Assignment #19

We want customers to offer tickets to events in Amsterdam and when you buy them, we automatically
dispatch a car to pick you up to the event.


## Description

- The app should have a login and signup page for customers.
You need to login to create events, tickets and comments.

- Events have:

  - a name
  - a description
  - a picture or logo
  - a start and end date (could be the same)

- After you click on an event, you see a list of tickets that are offered for this event.

- A ticket is made for a specific event and has an author (the user that created the ticket).
- Apart from that, it has:
  a picture of the ticket (optional field)
  a price
  a description

* When you click on a ticket, you see the details of that ticket (description/price) **and which event it's for**.

* On this page you can add comments as a customer, and everybody can see all the comments.
* A comment has a text and is connected to a specific ticket. It also has an author.

- Anybody can view events and tickets, but you have to login to add a new ticket or comment.


## User stories

  - As a customer I want to see max. 4 events on a page
      and be able to click 'next' to see more pages of events if there are more.
  - As a customer I only want to see events that are not finished yet
  - As a customer I want to view a list of tickets when I click on an event
  - As a customer I want to view ticket details when I click on a ticket in the ticket list
  - As a customer I want to see what the fraud-risk is for a specific ticket
  - As a customer I want to be able to login, or sign up if I don't have an account yet
  - As a logged in customer I want to add a ticket (for a specific event) 
      that shows up on the event page with a title, picture, price and description
  - As an author of the ticket I want to be able to edit a ticket's description, price and picture
      (other logged in customers cannot do this! only authors and admins)
  - As a logged in customer I want to be able to create events
      with a name, picture (logo), date and description
  - As a customer I can see some color (red/yellow/green) indicating the fraud risk
      of a ticket for all tickets in the all tickets list



## !! Fraud risk algorithm !!

This is an important part of the assignment. If you only finish one thing, it should be this thing!

Tickets can be fraudulent, and as a customer I don't want to buy a fake ticket! Because of that we want to show to customers the risk that they are taking when buying the ticket.

On the ticket page for a specific ticket, we want to show a text like:
"We calculated that the risk of this ticket being a fraud is XX%"

The percentage should be calculated using the following algorithm:

  - if the ticket is the only ticket of the author, add 4%
  - if the ticket price is lower than the average ticket price for that event, that's a risk
    - if a ticket is X% cheaper than the average price, add X% to the risk
    - if a ticket is X% more expensive than the average price, deduct X% from the risk, with a maximum of 15% deduction
    - if the ticket was added during business hours (9-17), deduct 13% from the risk, if not, add 13% to the risk
  - if there are >3 comments on the ticket, add 6% to the risk
  - The minimal risk is 2% (there's no such thing as no risk) and the maximum risk is 98%.


