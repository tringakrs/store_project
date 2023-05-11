import User from 'src/user/entities/user-entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public street: string;

  @Column()
  public city: string;

  @Column()
  public country: string;

  //The inverse relationship is a bit of an abstract concept, and it does not create any additional columns in the database.
  @OneToOne(() => User, (user: User) => user.address)
  public user: User;
}
