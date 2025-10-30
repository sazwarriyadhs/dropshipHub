const db = require('../models')
const Order = db.order
const OrderItem = db.orderItem
const Product = db.product

// Create a new order
exports.createOrder = async (req, res) => {
  const { items } = req.body // items is an array of { productId, quantity }
  const userId = req.userId

  if (!items || items.length === 0) {
    return res.status(400).send({ message: 'Cart is empty.' })
  }

  try {
    let totalAmount = 0
    const orderItemsData = []

    for (const item of items) {
      const product = await Product.findByPk(item.productId)
      if (!product) {
        return res.status(404).send({ message: `Product with id=${item.productId} not found.` })
      }
      if (product.stock < item.quantity) {
        return res.status(400).send({ message: `Not enough stock for ${product.name}.` })
      }

      const price = product.price
      totalAmount += price * item.quantity
      orderItemsData.push({
        productId: item.productId,
        quantity: item.quantity,
        price: price,
      })

      // Decrease stock
      product.stock -= item.quantity
      await product.save()
    }

    // Create the order
    const order = await Order.create({
      userId: userId,
      totalAmount: totalAmount,
      status: 'pending',
    })

    // Create the order items
    for (const itemData of orderItemsData) {
      await OrderItem.create({
        ...itemData,
        orderId: order.id,
      })
    }

    res.status(201).send({ message: 'Order was created successfully!', orderId: order.id })
  } catch (error) {
    res.status(500).send({ message: error.message || 'Some error occurred while creating the Order.' })
  }
}

// Get all orders for the logged-in user
exports.getOrders = async (req, res) => {
  const userId = req.userId

  try {
    const orders = await Order.findAll({
      where: { userId: userId },
      include: [
        {
          model: OrderItem,
          include: [
            {
              model: Product,
              attributes: ['name', 'imageUrl'],
            },
          ],
        },
      ],
      order: [['createdAt', 'DESC']],
    })

    res.status(200).send(orders)
  } catch (error) {
    res.status(500).send({ message: error.message || 'Some error occurred while retrieving orders.' })
  }
}

// Get a single order by ID
exports.getOrderById = async (req, res) => {
  const orderId = req.params.id
  const userId = req.userId

  try {
    const order = await Order.findOne({
      where: { id: orderId, userId: userId }, // Ensure user can only see their own orders
      include: [
        {
          model: OrderItem,
          include: [
            {
              model: Product,
              attributes: ['name', 'description', 'imageUrl'],
            },
          ],
        },
      ],
    })

    if (!order) {
      return res.status(404).send({ message: 'Order not found.' })
    }

    res.status(200).send(order)
  } catch (error) {
    res.status(500).send({ message: 'Error retrieving order with id=' + orderId })
  }
}
