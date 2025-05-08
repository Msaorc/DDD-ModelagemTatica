import {Table, Model, PrimaryKey, Column, DataType, HasMany, ForeignKey, BelongsTo} from 'sequelize-typescript';
import CustomerModel from '../../../customer/repository/sequelize/customer.model';
// import OrderItemModel from './order-items.model';

@Table({
    tableName: "order",
    timestamps: false,
})

export default class OrderModel extends Model {

    @PrimaryKey
    @Column
    declare id: string;

    @ForeignKey(() => CustomerModel)
    @Column({allowNull: false})
    declare customer_id: string;

    @BelongsTo(() => CustomerModel)
    declare customer: CustomerModel;

    @HasMany(() => require('./order-items.model').default)
    declare items: any[];

    @Column({allowNull: false})
    declare total: number;
}