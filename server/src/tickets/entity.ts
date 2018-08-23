import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, JoinColumn } from 'typeorm'
import Event from '../events/entity'
import User from '../users/entity'

@Entity()
export default class Ticket extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text')
  description: string

  @Column('text')
  picture: string

  @Column('decimal')
  price: number

  @OneToMany(type => Comment, comment => comment.ticket, {
        eager: true
    })
  comments: Comment[];

  @Column("int", { nullable: true })
  event_id: number;

  @ManyToOne(type => Event, event => event.tickets)
  @JoinColumn({ name: "event_id" })
  event: Event

  @ManyToOne(type => User, user => user.tickets)
  user: User

  @CreateDateColumn()
  created_at: Date

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
