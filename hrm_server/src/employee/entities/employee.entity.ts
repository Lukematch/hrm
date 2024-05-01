import { Column, Entity, Index, PrimaryColumn } from "typeorm";

@Entity()
export class Employee {
  @PrimaryColumn()
  e_id: number
  @Column()
  avatar: string
  @Column()
  name: string
  @Column()
  age: number
  @Column()
  sex: string
  @Column()
  e_section: string
  @Column()
  e_grade: string
  @Column()
  salary: number
  @Column()
  e_identification: string
  @Column()
  e_address: string
  @Column()
  e_mail: string
  @Column()
  e_phone: string
  @Column()
  password: string
  @Column()
  salt: string
}
