import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
