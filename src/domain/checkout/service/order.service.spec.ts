import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order service unit tests", () => {

    it("should get total of all orders", () => {
        const item1 = new OrderItem("1", "item1", 50, "produto1", 3);
        const item2 = new OrderItem("2", "item2", 50, "produto2", 5);
        const item3 = new OrderItem("3", "item2", 70, "produto2", 7);

        const order1 = new Order("o1", "c1", [item1, item2]);
        const order2 = new Order("o2", "c2", [item3]);

        const total = OrderService.total([order1, order2]);
        expect(total).toBe(890)
    });

    it("should place an order", () => {
        const customer = new Customer("c1", "Customer1");
        const item1 = new OrderItem("i1", "Item1", 63, "p1", 5);

        const order = OrderService.placeOrder(customer, [item1]);
        expect(customer.rewardPoints).toBe(47.25);
        expect(order.total()).toBe(315);
    });
});