const db = require("../models");

async function init() {
  try {
    const seed = await db.sequelize.query(`
    insert into Transaction(customer_id, menu, price, qty, payment, total)
      values (1, 'Ayam Goreng', 15000, 1, 15000, 15000);

    insert into Transaction(customer_id, menu, price, qty, payment, total)
    values (1, 'Ayam Darat', 25000, 2, 50000, 50000);

    insert into Transaction(customer_id, menu, price, qty, payment, total)
    values (2, 'Ayam Laut', 50000, 3, 150000, 150000);
`)
  } catch (error) {
    console.log(error);
  }
}

init();