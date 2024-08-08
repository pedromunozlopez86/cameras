import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ type: 'timestamp' })
  updatedAt: Date;
}
