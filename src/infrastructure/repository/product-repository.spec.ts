import { Sequelize } from "sequelize-typescript";
import ProductModel from "../db/sequelize/model/product.model";


describe("Product repository test", () => {

    let sequileze: Sequelize;

    beforeEach(async () => {
        sequileze = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true},
        });
        sequileze.addModels([ProductModel]);
        afterAll(async () => {
            await sequileze.close();
        });
    })
});