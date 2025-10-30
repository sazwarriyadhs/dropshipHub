const config = require('../db.config.js')

const Sequelize = require('sequelize')
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.user = require('./user.model.js')(sequelize, Sequelize)
db.role = require('./role.model.js')(sequelize, Sequelize)
db.product = require('./product.model.js')(sequelize, Sequelize)
db.order = require('./order.model.js')(sequelize, Sequelize)
db.orderItem = require('./orderItem.model.js')(sequelize, Sequelize)

// User-Role Relationship (Many-to-Many)
db.role.belongsToMany(db.user, {
  through: 'user_roles',
})
db.user.belongsToMany(db.role, {
  through: 'user_roles',
})

// User-Order Relationship (One-to-Many)
db.user.hasMany(db.order)
db.order.belongsTo(db.user)

// Order-Product Relationship (Many-to-Many) through OrderItem
db.order.hasMany(db.orderItem)
db.orderItem.belongsTo(db.order)

db.product.hasMany(db.orderItem)
db.orderItem.belongsTo(db.product)

db.ROLES = ['user', 'admin', 'moderator']

module.exports = db
