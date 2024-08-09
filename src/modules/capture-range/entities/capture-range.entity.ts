import { Event } from 'src/modules/events/entities/event.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('captureRanges')
export class CaptureRange {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int' })
  rangeTypeId: number;

  @Column({ type: 'date' })
  onlyDay: Date;

  @Column({ type: 'date' })
  weekStartDate: Date;

  @Column({ type: 'date' })
  weekEndDate: Date;

  @Column({ type: 'date' })
  monthStartDate: Date;

  @Column({ type: 'date' })
  monthEndDate: Date;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.captureRange)
  user: User;

  @OneToMany(() => Event, (event) => event.captureRange)
  events: Event[];
}
