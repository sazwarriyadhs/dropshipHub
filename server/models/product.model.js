module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('product', {
    externalId: {
      type: DataTypes.STRING,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
    },
    selling_price: {
      type: DataTypes.FLOAT,
    },
    original_price: {
      type: DataTypes.FLOAT,
    },
    marketplace: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.FLOAT,
    },
    reviews: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.TEXT,
    },
    weight: {
      type: DataTypes.FLOAT,
      defaultValue: 1,
    },
    stock: {
      type: DataTypes.INTEGER,
    },
    seller: {
      type: DataTypes.STRING,
    },
    seller_city: {
      type: DataTypes.STRING,
      defaultValue: 'Jakarta',
    },
    last_updated: {
      type: DataTypes.DATE,
    },
  })

  return Product
}
