import { Capture } from 'src/modules/captures/entities/capture.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cameras')
export class Camera {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 15 })
  ipAddress: string;

  @Column({ type: 'int' })
  portNo: number;

  @Column({ type: 'varchar', length: 10 })
  protocol: string;

  @Column({ type: 'varchar', length: 50 })
  macAddress: string;

  @Column({ type: 'varchar', length: 50 })
  channelId: string;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @OneToOne(() => Capture, (capture) => capture.camera)
  capture: Capture;
}
