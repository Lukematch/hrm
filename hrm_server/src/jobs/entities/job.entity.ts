import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Job {
  @PrimaryColumn()
  id: number;
  @Column()
  e_id: number;
  @Column()
  e_section: string;
  @Column()
  job_name: string;
  @Column()
  job_type: string;
  @Column()
  job_descriptions: string;
  @Column()
  job_manager: string;
  @Column()
  job_progress: string;
  @Column()
  job_status: string;
  @Column()
  job_time: string;
  @Column()
  remark: string;
}
