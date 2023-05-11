import { Post } from '@nestjs/common';
import { Expose, Transform, TransformFnParams } from 'class-transformer';
import { Address } from 'src/address/entities/address-entity';
import Posts from 'src/post/entities/post-entity';

import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ unique: true })
  @Expose()
  public email: string;

  @Column()
  @Expose()
  public name: string;

  @Column()
  public password: string;

  // //Currently, our relationship is unidirectional. It means that only one side of the relationship has information about the other side. We could change that by creating an inverse relationship.
  // //By doing so, we make the relationship between the User and the Address bidirectional.
  // @OneToOne(() => Address, {
  //   //If we want our related entities always to be included, we can make our relationship eager.
  //   eager: true,
  //   //We can turn on the cascade option. Thanks to that, we can save an address while saving a user.
  //   cascade: true,
  // })
  // @JoinColumn()
  // public address: Address;

  @OneToOne(() => Address, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  @Transform(({ value }: TransformFnParams) => value || undefined, {
    toPlainOnly: true,
  })
  public address: Address;

  @OneToMany(() => Posts, (post: Posts) => post.author)
  public posts: Posts[];
}

export default User;
