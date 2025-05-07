import Customer from "./domain/customer/entity/customer";
import Address from "./domain/entity/address";
import OrderItem from "./domain/checkout/entity/order_item";
import Order from "./domain/checkout/entity/order";

let customer = new Customer("2021", "Cliente 1");
const address = new Address("Rua", 200, "17999-251", "Guaratuba");
customer.Address = address;
customer.activate();

const item1 = new OrderItem("123", "Item 1", 150, "2", 2);;
const item2 = new OrderItem("123", "Item 2", 165, "3", 4);;
const order = new Order("254718", customer.id, [item1, item2]);
