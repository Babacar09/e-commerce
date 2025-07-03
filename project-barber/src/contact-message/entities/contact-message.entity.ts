import { UserEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ContactMessageEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name:string

    @Column()
    email: string

    @Column('text')
    message: string

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(()=>UserEntity,(user)=>user.contactMessages,
    {   
        onDelete:'SET NULL',
        nullable:true
    })
    user: UserEntity;


@Column({ default: 'pending' })
status: 'pending' | 'replied';

@Column({ type: 'text', nullable: true })
response?: string;

}
