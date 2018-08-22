import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import Ticket from '../tickets/entity'

@Entity()
export default class Event extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text')
  name: string

  @Column('text')
  description: string

  @Column('text')
  picture: string

  @Column('date')
  startDate: string

  @Column('date')
  endDate: string

  @OneToMany(type => Ticket, ticket => ticket.event, {
        eager: true
    })
  tickets?: Ticket[];

}