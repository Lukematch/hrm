import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Attendance {
  @PrimaryColumn()
  id: number;
  @Column()
  e_id: number;
  @Column()
  name: string;
  @Column()
  e_section: string;
  @Column()
  attendance_time: string;
  @Column()
  attendance_date: string;
  @Column()
  attendance_status: string;
}
