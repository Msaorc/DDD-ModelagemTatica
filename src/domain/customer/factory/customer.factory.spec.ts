import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit test", () => {
    it("should create a customer", () => {
        let customer = CustomerFactory.create("customer1");

        expect(customer.id).toBeDefined()
        expect(customer.name).toBe("customer1");
        expect(customer.constructor.name).toBe("Customer");
        expect(customer.Address).toBeUndefined();
    });

    it("should create a customer", () => {
        const address = new Address("Street", 1, "13330-250", "São Paulo");
        let customer = CustomerFactory.createWithAddress("customer1", address);

        expect(customer.id).toBeDefined()
        expect(customer.name).toBe("customer1");
        expect(customer.Address).toBe(address);
    });
});