module.exports = (sequelize, Sequelize) => {
  const OrderItem = sequelize.define('orderItem', {
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    price: {
      type: Sequelize.DECIMAL(10, 2), // Price per unit at the time of order
      allowNull: false,
    },
  })

  return OrderItem
}
