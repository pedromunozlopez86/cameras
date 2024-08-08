import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
  ) {}
  create(createEventDto: CreateEventDto) {
    try {
      const event = this.eventsRepository.create(createEventDto);
      return this.eventsRepository.save(event);
    } catch (error) {
      throw new Error(error);
    }
  }

  findAll() {
    return this.eventsRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event ${updateEventDto}`;
  }
}
