import Customer from "../../entity/customer";
import EventDispatcher from "../../../@shared/event/event-dispatcher";
import AddressCustomerChangeEvent from "../address-customer-change.event";
import CustomerCreatedEvent from "../customer-created.event";
import EnviaConsoleLogHandler from "../handler/envia-console-log.handler";
import EnviaConsoleLog1Handler from "../handler/envia-console-log1-handler";
import EnviaConsoleLog2Handler from "../handler/envia-console-log2-handler";
import Address from "../../value-object/address";

describe("Domain events tests", () => {

    it("should notify when a client is created should trigger two events", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsoleLog1Handler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");
        eventDispatcher.register("CustomerCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(1);

        const eventHandler2 = new EnviaConsoleLog2Handler();
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);

        const customer = new Customer("1", "Customer 1");
        const customerCreatedEvent = new CustomerCreatedEvent(customer);

        eventDispatcher.notify(customerCreatedEvent);
        expect(spyEventHandler).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();
    });

    it("should notify when customer address changes", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsoleLog1Handler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");
        eventDispatcher.register("CustomerCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(1);

        const eventHandler2 = new EnviaConsoleLog2Handler();
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);

        const customer = new Customer("1", "Customer 1");
        const customerCreatedEvent = new CustomerCreatedEvent(customer);

        eventDispatcher.notify(customerCreatedEvent);
        expect(spyEventHandler).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();

        const eventHandlerChangeAddress = new EnviaConsoleLogHandler();
        const spyEventHandlerChangeAddress = jest.spyOn(eventHandlerChangeAddress, "handle");
        eventDispatcher.register("AddressCustomerChangeEvent", eventHandlerChangeAddress);

        expect(eventDispatcher.getEventHandlers["AddressCustomerChangeEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["AddressCustomerChangeEvent"].length).toBe(1);

        const address = new Address("street 1", 200, "17523-555", "city 1");
        customer.changeAddress(address);
        
        const customerChangeAddressEvent = new AddressCustomerChangeEvent(customer);
        eventDispatcher.notify(customerChangeAddressEvent);
        expect(spyEventHandlerChangeAddress).toHaveBeenCalled();
    });
});