import Order from "../../domain/checkout/entity/order";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order-items.model";
import OrderRepositoryInterface from "../../domain/checkout/repository/order.repository";
import OrderItem from "../../domain/checkout/entity/order_item";

export default class OrderRepository implements OrderRepositoryInterface{

    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total(),
            items: entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity,
            })),
        },
        {
            include: [{model: OrderItemModel}]
        });
    }

    async update(entity: Order): Promise<void> {
        await OrderModel.update(
            {
                customer_id: entity.customerId,
                total: entity.total(),
            },
            {
                where: {
                    id: entity.id,
                },
            },
        );

        await Promise.all(
            entity.items.map(async (item) => {
              const [affectedRows] = await OrderItemModel.update(
                {
                  name: item.name,
                  price: item.price,
                  product_id: item.productId,
                  quantity: item.quantity,
                },
                {
                  where: {
                    id: item.id,
                    order_id: entity.id,
                  },
                }
              );
            })
        );
    }

    async find(id: string): Promise<Order> {
        let orderModel;
        orderModel = await OrderModel.findOne({
            where: {
                id,
            },
            include: ["items"],
        });

        const orderItems = orderModel.items.map(item => 
            new OrderItem(item.id, item.name, Number(item.price), item.product_id, item.quantity)
        );

        return new Order(id, orderModel.customer_id, orderItems);
    }

    async findAll(): Promise<Order[]> {
        const ordersModel = await OrderModel.findAll({
            include: ["items"]
        });

        const orders = ordersModel.map((orderModel) => {
            let orderItems = orderModel.items.map(item => 
                new OrderItem(item.id, item.name, Number(item.price), item.product_id, item.quantity)
            );

            let order = new Order(orderModel.id, orderModel.customer_id, orderItems);
            return order;
        });
        return orders;
    }
}