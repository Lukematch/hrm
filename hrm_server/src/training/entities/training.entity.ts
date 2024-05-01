import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Training {
  @PrimaryColumn()
  id: number;
  @Column()
  e_id: number;
  @Column()
  train_id: string;
  @Column()
  name: string;
  @Column()
  train_type: string;
  @Column()
  topic: string;
  @Column()
  train_content: string;
  @Column()
  remark: string;
  @Column()
  train_teacher: string;
  @Column()
  train_experience: string;
  @Column()
  train_status: string;
}
