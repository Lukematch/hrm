import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Command {
  @PrimaryColumn()
  id: number;
  @Column()
  com_id: string;
  @Column()
  f_id: string;
  @Column()
  com_content: string;
  @Column()
  com_time: string;
}
