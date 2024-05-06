import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Salary {
  @PrimaryColumn()
  id: number;
  @Column()
  e_id: number;
  @Column()
  e_section: string;
  @Column()
  e_grade: string;
  @Column()
  base_salary: number;
  @Column()
  performance_salary: number;
  @Column()
  paid_salary: number;
  @Column()
  bonus: number;
  @Column()
  fine: number;
  @Column()
  fine_reason: string;
  @Column()
  actual_salary: number;
  @Column()
  date: string;
  @Column()
  time: string;

}

