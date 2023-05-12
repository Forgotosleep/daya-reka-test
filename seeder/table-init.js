const db = require("../models");

async function init() {
  try {
    /* Cleans up the previous */
    const cleanup = await db.sequelize.query(`
      DROP TABLE IF EXISTS Transaction CASCADE;
      DROP TABLE IF EXISTS Customer;
    `)

    const customer = await db.sequelize.query(`
      create table IF NOT EXISTS Customer (
        id SERIAL  primary key not null,
        name VARCHAR(100) not null
      );
    `)

    const trx = await db.sequelize.query(`
      create table IF NOT EXISTS Transaction (
        id serial PRIMARY KEY,
        customer_id INT NOT NULL,
        menu VARCHAR ( 255 ) NOT NULL,
        price int NOT NULL,
        qty int NOT NULL,
        payment int NOT NULL,
        total int NOT NULL,
        created_at TIMESTAMP default current_timestamp,
        CONSTRAINT fk_group
          FOREIGN KEY(customer_id)
            REFERENCES Customer(id)
            ON UPDATE CASCADE
            ON DELETE CASCADE
      );
    `)
  } catch (error) {
    console.log(error);
  }
}

init();