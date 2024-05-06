import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Feedback {
  @PrimaryColumn()
  id: number;
  @Column()
  f_id: string;
  @Column()
  f_title: string;
  @Column()
  description: string;
  @Column()
  content: string;
  @Column()
  f_time: string;
}
