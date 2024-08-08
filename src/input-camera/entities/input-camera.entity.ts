import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('inputCamera')
export class InputCamera {
  @PrimaryGeneratedColumn()
  id: number;
}
