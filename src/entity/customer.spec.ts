import Address from "./address";
import Customer from "./customer";

describe("Customer unit testes", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            let customer = new Customer("", "User Test");
        }).toThrow("Id is required");
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            let customer = new Customer("123", "");
        }).toThrow("Name is required");
    });

    it("should change name", () => {
        const customer = new Customer("123", "User Test");
        customer.changeName("customer test");
        expect(customer.name).toBe("customer test");
    });

    it("should activate customer", () => {
        const customer = new Customer("1", "Customer Address");
        const address = new Address("Street 1", 123, "12457-888", "Piratininga");
        customer.setAddress(address);
        customer.activate();

        expect(customer.isActive()).toBe(true);
    });

    it("should deactivate customer", () => {
        const customer = new Customer("1", "Customer Address");
        customer.deactivate();

        expect(customer.isActive()).toBe(false);
    });

    it("should throw erro when address is undefined when you activate a customer", () => {
        expect(() => {
            const customer = new Customer("1", "Customer Address");
            customer.activate();
        }).toThrow("Address is mandatory to activate a customer");
    });
});