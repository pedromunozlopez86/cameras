import { CaptureRange } from 'src/modules/capture-range/entities/capture-range.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  surname: string;

  @Column({ type: 'varchar', length: 50 })
  email: string;

  @Column({ type: 'varchar', length: 50 })
  password: string;

  @Column({ type: 'int' })
  userTypeId: number;

  @Column({ type: 'int' })
  captureRangeId: number;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @OneToOne(() => CaptureRange)
  @JoinColumn({ name: 'captureRangeId' })
  captureRange: CaptureRange;
}
