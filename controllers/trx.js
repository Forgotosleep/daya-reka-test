const db = require("../models");

const { initRedis } = require("../helpers/redis");
const redis = initRedis();

class TransactionController {
  static async get(req, res, next) {
    try {
      const { menu, minPrice, maxPrice, orderByCustomerName } = req.query;

      const checkCache = await redis.get(JSON.stringify(req.query));
      if (checkCache) {
        res.status(200).json({ data: JSON.parse(checkCache), info: "from cache" });
      }

      // Adds WHERE conditionals to query
      let condition = ""
      let conditions = []
      if (menu || minPrice || maxPrice) {
        if (menu) {
          conditions.push(`menu LIKE '%${menu}%'`)
        }
        if (minPrice) {
          conditions.push(`price >= ${minPrice}`)
        }
        if (maxPrice) {
          conditions.push(`price <= ${maxPrice}`)
        }
      }
      conditions.forEach((element, index) => {  // Combines every conditions into one query statement
        if (index != 0) {  // Adds the word AND except for the first WHERE condition
          condition += " AND "
        }
        condition += element
      });
      if (conditions[0]) condition = "WHERE " + condition  // completes the WHERE condition

      // Adds Order By query
      let orderBy = "transaction.id DESC"  // Default Order by if not provided
      if (orderByCustomerName) {
        orderBy = "Customer.id"
        if (orderByCustomerName == "DESC") {
          orderBy += " DESC"
        }
        else {
          orderBy += " ASC"
        }
      }

      let query = `select transaction.id as trx_id, customer_id, Customer.name as customer_name, menu, price, qty, payment, total, created_at from transaction JOIN Customer ON Transaction.customer_id = Customer.id ${condition} group by Customer.id, transaction.id order by ${orderBy}`  // Complete Query

      // res.status(201).json({ message: query });  // query printer. For testing

      const result = await db.sequelize.query(query)  // Executes Query
      redis.set(JSON.stringify(req.query), JSON.stringify(result[0]));  // Redis set data to cache if not found in cache

      res.status(200).json({ data: result[0], info: "from db" });
    } catch (err) {
      next(err);
    }
  }

  static async create(req, res, next) {
    try {
      const { customer_id, menu, price, qty, payment } = req.body
      let totalPrice = price * qty

      // let query = `BEGIN; insert into "Transaction"(id, customer_id, menu, price, qty, payment, total) values (6, ${customer_id}, '${menu}', ${price}, ${qty}, ${payment}, ${totalPrice}); COMMIT; EXCEPTION WHEN OTHERS THEN ROLLBACK; END;`  // Query with Transaction Commit/Abort feature. Not working atm.

      let query = `insert into Transaction(customer_id, menu, price, qty, payment, total)
      values (${customer_id}, '${menu}', ${price}, ${qty}, ${payment}, ${totalPrice});`

      const result = await db.sequelize.query(query)

      const successMessage = "Transaction successful"
      const failMessage = "Transaction failed"
      res.status(201).json({ message: result[1] ? successMessage : failMessage });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = TransactionController;
