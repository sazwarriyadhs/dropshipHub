const axios = require('axios')
const cron = require('node-cron')
const { Product } = require('../models')

const updateProducts = async () => {
  console.log('🔄 Starting product update...')

  try {
    // Fetch from external API
    const response = await axios.get('https://dummyjson.com/products')
    const externalProducts = response.data.products

    let updatedCount = 0
    let createdCount = 0

    for (const externalProduct of externalProducts) {
      const productData = {
        name: externalProduct.title,
        title: externalProduct.title,
        selling_price: externalProduct.price,
        original_price: externalProduct.price,
        marketplace: 'DummyJSON',
        category: externalProduct.category,
        imageUrl: externalProduct.thumbnail,
        rating: externalProduct.rating,
        reviews: Math.floor(Math.random() * 500), // Dummy data for reviews
        description: externalProduct.description,
        weight: externalProduct.weight || 1,
        stock: externalProduct.stock,
        seller: 'DummySeller',
        seller_city: 'Jakarta',
        last_updated: new Date(),
      }

      const [product, created] = await Product.findOrCreate({
        where: { externalId: externalProduct.id },
        defaults: productData,
      })

      if (created) {
        createdCount++
      } else {
        await product.update(productData)
        updatedCount++
      }
    }

    console.log(`✅ Products updated: ${updatedCount} updated, ${createdCount} created`)
  } catch (error) {
    console.error('❌ Failed to update products:', error.message)
  }
}

// Schedule cron job: every 5 minutes
cron.schedule('*/5 * * * *', updateProducts)

// Run once at startup
updateProducts()

module.exports = updateProducts
