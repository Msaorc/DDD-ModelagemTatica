import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import OrderModel from "./order.model";
import OrderItemModel from "./order-items.model";
import ProductModel from "../../../product/repository/sequelize/product.model";
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import Product from "../../../../domain/product/entity/product";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import Order from "../../../../domain/checkout/entity/order";
import OrderRepository from "./order.repository";


describe("Order repository test", () => {

    let sequileze: Sequelize;

    beforeEach(async () => {
        sequileze = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true},
        });
        sequileze.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
        await sequileze.sync();
    });

    afterAll(async () => {
        await sequileze.close();
    });

    it("should create a new order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("street 1", 1, "Zipcode", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 250);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            4
        );

        const orderRepository = new OrderRepository();
        const order = new Order("1", customer.id, [orderItem]);
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: {id: order.id},
            include: ["items"],
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: customer.id,
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price.toString(),
                    product_id: orderItem.productId,
                    quantity: orderItem.quantity,
                    order_id: order.id
                },
            ],
        })
    });

    it("should update a order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("street 1", 1, "Zipcode", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 250);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            4
        );

        const orderRepository = new OrderRepository();
        const order = new Order("1", customer.id, [orderItem]);
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: {id: order.id},
            include: ["items"],
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: customer.id,
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price.toString(),
                    product_id: orderItem.productId,
                    quantity: orderItem.quantity,
                    order_id: order.id
                },
            ],
        })

        const orderItemUpdate = new OrderItem(
            "1",
            product.name,
            300,
            product.id,
            50
        );

        const orderUpdate = new Order("1", customer.id, [orderItemUpdate]);
        await orderRepository.update(orderUpdate);

        const itensUpdate = await OrderItemModel.findOne({
            where: {id: orderItemUpdate.id}
        });

        expect(itensUpdate.toJSON()).toStrictEqual({
            id: "1",
            name: product.name,
            order_id: "1",
            price: "300",
            product_id: product.id,
            quantity: 50
        });

        const orderModelUpdate = await OrderModel.findOne({
            where: {id: orderUpdate.id},
            include: ["items"],
        });

        expect(orderModelUpdate.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: orderUpdate.customerId,
            total: orderUpdate.total(),
            items: [
                {
                    id: orderItemUpdate.id,
                    name: orderItemUpdate.name,
                    price: orderItemUpdate.price.toString(),
                    product_id: orderItemUpdate.productId,
                    quantity: orderItemUpdate.quantity,
                    order_id: order.id
                },
            ],
        });
    });

    it("should find a order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("street 1", 1, "Zipcode", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 250);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            4
        );

        const orderRepository = new OrderRepository();
        const order = new Order("1", customer.id, [orderItem]);
        await orderRepository.create(order);
        
        const orderModel = await orderRepository.find(order.id)

        expect(orderModel).toStrictEqual(order);
    });

    it("should find all orders", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const customer2 = new Customer("345", "Customer 2");
        const address = new Address("street 1", 1, "Zipcode", "City 1");
        const address2 = new Address("street 2", 2, "Zipcode", "City 2");
        customer.changeAddress(address);
        customer2.changeAddress(address2);
        await customerRepository.create(customer);
        await customerRepository.create(customer2);

        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 250);
        const product2 = new Product("2", "Product 2", 350);
        await productRepository.create(product);
        await productRepository.create(product2);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            4
        );
       
        const orderItem2 = new OrderItem(
            "2",
            product2.name,
            product2.price,
            product2.id,
            6
        );

        const orderRepository = new OrderRepository();
        const order = new Order("1", customer.id, [orderItem]);
        const order2 = new Order("2", customer2.id, [orderItem2]);
        console.log('Teste passou')
        await orderRepository.create(order);
        await orderRepository.create(order2);

        const orders = await orderRepository.findAll()

        expect(orders).toContainEqual(order);
        expect(orders).toContainEqual(order2);
        expect(orders).toStrictEqual([order,order2]);
        expect(orders).toHaveLength(2);
    });
});