import EventHandlerInterface from "../../@shared/event-handler.interface";
import EventInterface from "../../@shared/event.interface";
import AddressCustomerChangeEvent from "../address-customer-change.event";

export default class EnviaConsoleLogHandler implements EventHandlerInterface<AddressCustomerChangeEvent>{
    handle(event: EventInterface): void {
        console.log(`Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.Address.toString()}`);
    }
}