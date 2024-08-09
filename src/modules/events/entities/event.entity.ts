import { CaptureRange } from 'src/modules/capture-range/entities/capture-range.entity';
import { Capture } from 'src/modules/captures/entities/capture.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;
  @Column({ type: 'varchar' })
  type: string;

  @Column({ type: 'varchar' })
  state: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'int' })
  captureId: number;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => CaptureRange, (captureRange) => captureRange.events)
  captureRange: CaptureRange;

  @OneToMany(() => Capture, (capture) => capture.event)
  captures: Capture[];
}
