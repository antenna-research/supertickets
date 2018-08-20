import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm'
import Event from '../events/entity'
import User from '../users/entity'

@Entity()
export class Ticket extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text')
  description: string

  @Column('text')
  picture: string

  @Column('text')
  price: string
  // @Column('decimal')
  // price: number

  @OneToMany(type => Comment, comment => comment.ticket, {
        eager: true
    })
  comments: Comment[];

  @ManyToOne(type => Event, event => event.tickets)
  event: Event

  @ManyToOne(type => User, user => user.tickets)
  user: User

}

@Entity()
export class Comment extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text')
  body: string

  @ManyToOne(type => User, user => user.comments)
  user: User

  @ManyToOne(type => Ticket, ticket => ticket.comments)
  ticket: Ticket

}
