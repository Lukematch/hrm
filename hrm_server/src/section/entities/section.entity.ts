import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Section {
  @PrimaryColumn()
  section_id: string;
  @Column()
  section_name: string;
  @Column()
  create_time: string;
  @Column()
  description: string;
  @Column()
  departer: string;
  @Column()
  note: string;
}
