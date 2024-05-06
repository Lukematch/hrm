import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class RelieveApply {
  @PrimaryColumn()
  id: number;
  @Column()
  e_id: number;
  @Column()
  name: string;
  @Column()
  e_section: string;
  @Column()
  e_grade: string;
  @Column()
  re_section: string;
  @Column()
  re_grade: string;
  @Column()
  re_time: string;
  @Column()
  re_status: string;
}
