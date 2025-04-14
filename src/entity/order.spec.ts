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

    it("should calculate total", () => {
        const item = new OrderItem("1", "Item 1", 55, "p1", 2);
        const item2 = new OrderItem("2", "Item 2", 75, "p2", 4);
        const order = new Order("1", "123", [item, item2]);

        expect(order.total()).toEqual(410);
    });

    it("should throw error if the item qtd is less or equal zero", () => {
        expect(() => {
            const item = new OrderItem("1", "Item 1", 55, "p1", 0);
            const order = new Order("1", "123", [item]);
        }).toThrow("Quantity cannot be less than or equal to zero");
    });
});