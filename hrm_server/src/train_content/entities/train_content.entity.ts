import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class TrainContent {
  @PrimaryColumn()
  train_id: string;
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
}
