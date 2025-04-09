import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit testes", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            let order = new Order("", "User Test", []);
        }).toThrow("Id is required");
    });

    it("should throw error when customerId is empty", () => {
        expect(() => {
            let order = new Order("123", "", []);
        }).toThrow("CustomerId is required");
    });

    it("should throw error when items are empty", () => {
        expect(() => {
            let order = new Order("123", "45585", []);
        }).toThrow("Item qtd must be graeter than 0");
    });

    it("should throw error when name is empty", () => {
        const item = new OrderItem("1", "Item 1", 55);
        const item2 = new OrderItem("2", "Item 2", 75);
        const order = new Order("1", "123", [item, item2]);

        expect(order.total()).toEqual(130);
    });
});