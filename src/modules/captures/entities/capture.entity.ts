import { Camera } from 'src/modules/cameras/entities/camera.entity';
import { Event } from 'src/modules/events/entities/event.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('captures')
export class Capture {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int' })
  peopleCount: number;

  @Column({ type: 'int' })
  faceExpressionId: number;

  @Column({ type: 'int' })
  ageGroupId: number;

  @Column({ type: 'int' })
  genderId: number;

  @Column({ type: 'boolean' })
  mask: boolean;

  @Column({ type: 'int' })
  glassesId: number;

  @Column({ type: 'int' })
  hatId: number;

  @Column({ type: 'int' })
  cameraId: number;

  @Column({ type: 'timestamp' })
  timestamp: Date;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @ManyToOne(() => Event, (event) => event.captures)
  event: Event;

  @OneToOne(() => Camera)
  @JoinColumn({ name: 'cameraId' })
  camera: Camera;
}
