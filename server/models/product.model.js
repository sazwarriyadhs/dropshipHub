module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("product", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
    },
    marketplace: {
      type: DataTypes.STRING,
    },
    selling_price: {
      type: DataTypes.FLOAT,
    },
  });

  return Product;
};
