import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Notice {
  @PrimaryColumn()
  // 主键 不为空
  notice_id: number;
  @Column()
  // 不为空
  notice_topic: string;
  @Column()
  notice_title: string;
  @Column()
  // 不为空
  content: string;
  @Column()
  note: string;
  @Column()
  send_time: string;
  @Column()
  sender: string;
}
