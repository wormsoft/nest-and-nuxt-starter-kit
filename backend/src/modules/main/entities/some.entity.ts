import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SomeEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;
}
