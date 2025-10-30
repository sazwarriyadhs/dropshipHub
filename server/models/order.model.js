module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define('order', {
    status: {
      type: Sequelize.STRING,
      defaultValue: 'pending', // e.g., pending, processing, shipped, delivered, cancelled
    },
    totalAmount: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
  })

  return Order
}
