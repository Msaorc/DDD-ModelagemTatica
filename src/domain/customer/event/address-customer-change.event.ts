import EventInterface from "../../@shared/event/event.interface";

export default class AddressCustomerChangeEvent implements EventInterface {
    dateTimeOccurred: Date;
    eventData: any;

    constructor(eventData: any) {
        this.dateTimeOccurred = new Date();
        this.eventData = eventData;
    }    
}