import axios from 'axios'
import authHeader from '../utils/auth-header.js'

const API_URL = 'http://localhost:8080/api/orders'

const getOrders = () => {
  return axios.get(API_URL, { headers: authHeader() })
}

const createOrder = (orderData) => {
  return axios.post(API_URL, orderData, { headers: authHeader() })
}

const getOrderById = (id) => {
  return axios.get(API_URL + `/${id}`, { headers: authHeader() })
}

const orderService = {
  getOrders,
  createOrder,
  getOrderById,
}

export default orderService
