import {Table, Model, PrimaryKey, Column, DataType, HasMany, ForeignKey, BelongsTo} from 'sequelize-typescript';
import CustomerModel from './customer.model';
import Customer from '../../../../domain/entity/customer';
import ProductModel from './product.model';
import OrderModel from './order.model';

@Table({
    tableName: "order_items",
    timestamps: false,
})

export default class OrderItemModel extends Model {

    @PrimaryKey
    @Column
    declare id: string;

    @ForeignKey(() => ProductModel)
    @Column({allowNull: false})
    declare product_id: string;

    @BelongsTo(() => ProductModel)
    declare product: ProductModel;

    @ForeignKey(() => OrderModel)
    @Column({allowNull: false})
    declare order_id: string;

    @BelongsTo(() => OrderModel)
    declare order: OrderModel;

    @Column({allowNull: false})
    declare quantity: number;

    @Column({allowNull: false})
    declare name: string;

    @Column({allowNull: false})
    declare price: string;
}