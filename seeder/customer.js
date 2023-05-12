const db = require("../models");

async function init() {
  try {
    const seed = await db.sequelize.query(`
    INSERT INTO Customer(name) 
    values ('Willem');
    INSERT INTO Customer(name) 
    values ('Brian')
`)
  } catch (error) {
    console.log(error);
  }
}

init();