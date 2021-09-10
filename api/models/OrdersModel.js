const S = require("sequelize");
const db = require("../db");

class Orders extends S.Model {}
Orders.init(
  {
    order_id: {
      type: S.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: S.INTEGER,
    },
    products: {
      type: S.JSONB,
      primaryKey: true,
    },
    total_price: {
      type: S.INTEGER,
      allowNull: false,
    },
    created: {
      type: S.DATE,
      // defaultValue:''
    },
  },
  { sequelize: db, modelName: "orders" }
);

module.exports = Orders;