import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('links')
export class Link {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('numeric', { nullable: false })
  subject: number;

  @Column('varchar', { length: 25, nullable: true })
  linkType: string;

  @Column('numeric', { nullable: false })
  object: number;
}
