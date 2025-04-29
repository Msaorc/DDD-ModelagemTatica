import Order from "../../domain/entity/order";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order-items.model";

export default class OrderRepository {

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

    // async update(entity: Customer): Promise<void> {
    //     await CustomerModel.update(
    //         {
    //         name: entity.name,
    //         street: entity.Address.street,
    //         number: entity.Address.number,
    //         zipcode: entity.Address.zip,
    //         city: entity.Address.city,
    //         active: entity.isActive(),
    //         rewardPoints: entity.rewardPoints,
    //         },
    //         {
    //         where: {
    //             id: entity.id,
    //         },
    //         }
    //     );
    // }

    // async find(id: string): Promise<Customer> {
    //     let customerModel;
    //     try {
    //         customerModel = await CustomerModel.findOne({
    //         where: {
    //             id,
    //         },
    //         rejectOnEmpty: true,
    //         });
    //     } catch (error) {
    //         throw new Error("Customer not found");
    //     }

    //     const customer = new Customer(id, customerModel.name);
    //     const address = new Address(
    //         customerModel.street,
    //         customerModel.number,
    //         customerModel.zipcode,
    //         customerModel.city
    //     );
    //     customer.changeAddress(address);
    //     return customer;
    // }

    // async findAll(): Promise<Customer[]> {
    //     const customerModels = await CustomerModel.findAll();

    //     const customers = customerModels.map((customerModels) => {
    //         let customer = new Customer(customerModels.id, customerModels.name);
    //         customer.addRewardPoints(customerModels.rewardPoints);
    //         const address = new Address(
    //         customerModels.street,
    //         customerModels.number,
    //         customerModels.zipcode,
    //         customerModels.city
    //         );
    //         customer.changeAddress(address);
    //         if (customerModels.active) {
    //             customer.activate();
    //         }
    //         return customer;
    //     });

    //     return customers;
    // }
}