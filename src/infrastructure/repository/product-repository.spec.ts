import { Sequelize } from "sequelize";


describe("Product repository test", () => {

    let sequileze: Sequelize;

    beforeEach(async () => {
        sequileze = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true},
        });

        afterAll(async () => {
            await sequileze.close();
        });
    })
});