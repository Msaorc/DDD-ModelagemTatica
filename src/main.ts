import Customer from "./entity/customer";
import Address from "./entity/address";
import OrderItem from "./entity/order_item";
import Order from "./entity/order";

let customer = new Customer("2021", "Cliente 1");
const address = new Address("Rua", 200, "17999-251", "Guaratuba");
customer.setAddress(address);
customer.activate();

const item1 = new OrderItem("1", "Camiseta", 25.90);
const item2 = new OrderItem("2", "Chinelo", 15.00);
const order = new Order("254718", customer._id, [item1, item2]);
