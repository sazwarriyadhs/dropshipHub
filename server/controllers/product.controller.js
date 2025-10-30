const db = require('../models')
const Product = db.product // ✅ harus sama dengan index.js

exports.findAll = async (req, res) => {
  try {
    const products = await Product.findAll()
    res.status(200).json(products)
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Terjadi kesalahan saat mengambil produk.',
    })
  }
}

// Find a single product by Id (protected)
exports.findOne = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: { id: req.params.id, userId: req.userId },
    })
    if (product) {
      res.status(200).send(product)
    } else {
      res.status(404).send({ message: 'Product not found.' })
    }
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

// Create a new product (protected)
exports.create = async (req, res) => {
  try {
    const newProduct = await Product.create({
      ...req.body,
      userId: req.userId,
    })
    res.status(201).send(newProduct)
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

// Update a product (protected)
exports.update = async (req, res) => {
  try {
    await Product.update(req.body, {
      where: { id: req.params.id, userId: req.userId },
    })
    res.status(200).send({ message: 'Product updated successfully.' })
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

// Delete a product (protected)
exports.delete = async (req, res) => {
  try {
    await Product.destroy({
      where: { id: req.params.id, userId: req.userId },
    })
    res.status(200).send({ message: 'Product deleted successfully.' })
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}
