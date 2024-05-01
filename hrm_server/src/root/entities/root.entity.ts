import { Column, Entity, Index, PrimaryColumn } from "typeorm";

@Entity()
export class Root {
  @PrimaryColumn()
  r_id: number
  @Column()
  avatar: string
  @Column()
  username: string
  @Column()
  password: string
  @Column()
  salt: string
}
