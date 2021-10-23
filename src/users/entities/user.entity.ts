import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') // TODO: remove from response payload
  id: string;

  @IsNotEmpty()
  @Column({ unique: true })
  handle: string;

  @IsNotEmpty()
  @Column()
  name: string;

  @IsEmail()
  @Column()
  email: string;

  @IsString()
  @MinLength(8)
  @Column()
  password: string;
}
