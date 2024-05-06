import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class DimissionApply {
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
  e_phone: string;
  @Column()
  e_identification: string;
  @Column()
  di_reason: string;
  @Column()
  remark: string;
  @Column()
  di_time: string;
  @Column()
  di_status: string;
}
