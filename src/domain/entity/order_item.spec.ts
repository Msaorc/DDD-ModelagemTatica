import OrderItem from "./order_item";

describe("Customer unit testes", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            let orderItem = new OrderItem("", "Item test", 20, "123", 2);
        }).toThrow("Id is required");
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            let orderItem = new OrderItem("123", "", 20, "123", 2);
        }).toThrow("Name is required");
    });

    it("should generate error when price is zero", () => {
        expect(() => {
            let orderItem = new OrderItem("1", "Item test", 0, "123", 2);
        }).toThrow("Price must be greater than zero");
    });

    it("should generate error when price is zero", () => {
        expect(() => {
            let orderItem = new OrderItem("1", "Item test", -2, "123", 2);
        }).toThrow("Price cannot be negative");
    });

    it("should generate an error when the quantity is less than zero", () => {
        expect(() => {
            let orderItem = new OrderItem("1", "Item test", 150, "123", -2);
        }).toThrow("Quantity cannot be less than or equal to zero");
    });

    it("should change name", () => {
        let orderItem = new OrderItem("123", "Item 1", 350, "2", 2);
        orderItem.changeName("Item 2")
        expect(orderItem.name).toEqual("Item 2");
    });

    it("should change price", () => {
        let orderItem = new OrderItem("123", "Item 1", 150, "2", 2);
        orderItem.changePrice(175)
        expect(orderItem.price).toEqual(175);
    });

    it("should change quantity", () => {
        let orderItem = new OrderItem("123", "Item 1", 150, "2", 2);
        orderItem.changeQuantity(5)
        expect(orderItem.quantity).toEqual(5);
    });

    it("must bring the calculation of the item total", () => {
        let orderItem = new OrderItem("123", "Item 1", 150, "2", 2);
        expect(orderItem.itemTotal()).toEqual(300);
    });
});