import { OrderEntity } from "src/orders/entities/order.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('payments')
export class PaymentEntity {
@PrimaryGeneratedColumn()
id:number   
@ManyToOne(() => UserEntity, user => user.payments, { eager: true })
user: UserEntity;

@OneToOne(() => OrderEntity, { eager: true })
@JoinColumn()
order: OrderEntity;

@Column()
stripeSessionId: string;

@Column({ default: 'pending' })
status: string;

@CreateDateColumn()
createdAt: Date;

}
