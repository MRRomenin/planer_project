import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

}

// @Entity()
// export class Columns {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   title_colum: string;

//   @Column()
//   user_id: number;

// }
