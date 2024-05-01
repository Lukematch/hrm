import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class LeaveApply {
  @PrimaryColumn()
  e_id: number
  @Column()
  name: string
  @Column()
  e_phone: string
  @Column()
  leave_type: string
  @Column()
  start_time: string
  @Column()
  end_time: string
  @Column()
  leave_day: number
  @Column()
  leave_reason: string
  @Column()
  leave_time: string
  @Column()
  leave_status: string
}
