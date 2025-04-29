export default class OrderItem {

    private _id: string;
    private _productId: string;
    private _name: string;
    private _price: number;
    private _quantity: number;

    constructor(id: string, name: string, price: number, productId: string, quantity: number){
        this._id = id;
        this._name = name;
        this._price = price;
        this._productId = productId;
        this._quantity = quantity;
        this.validate();
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price;
    }

    get quantity(): number {
        return this._quantity;
    }

    get productId(): string {
        return this._productId;
    }

    validate(){
        if (this._id.length === 0) {
            throw new Error("Id is required");
        }

        if (this._name.length === 0) {
            throw new Error("Name is required");
        }

        if (this._price === 0) {
            throw new Error("Price must be greater than zero");
        }

        if (this._price < 0) {
            throw new Error("Price cannot be negative");
        }

        if (this._quantity <= 0) {
            throw new Error("Quantity cannot be less than or equal to zero");
        }
    }

    changeName(name: string){
        this._name = name;
    }

    changePrice(price: number) {
        this._price = price;
    }

    changeQuantity(quantity: number) {
        this._quantity = quantity
    }

    itemTotal(): number {
        return this._price * this._quantity;
    }
}