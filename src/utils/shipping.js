// Database kota (latitude, longitude)
const CITIES_DB = {
  JAKARTA: { lat: -6.2088, lon: 106.8456 },
  BANDUNG: { lat: -6.9175, lon: 107.6191 },
  SURABAYA: { lat: -7.2575, lon: 112.7521 },
}

// Haversine formula untuk jarak
const getDistance = (c1, c2) => {
  const toRad = (x) => (x * Math.PI) / 180
  const R = 6371
  const dLat = toRad(c2.lat - c1.lat)
  const dLon = toRad(c2.lon - c1.lon)
  const lat1 = toRad(c1.lat)
  const lat2 = toRad(c2.lat)
  const a =
    Math.sin(dLat / 2) ** 2 + Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

// Ongkir berdasarkan jarak (contoh)
export const calculateShippingCost = (weight, originCity, buyerCity) => {
  const origin = CITIES_DB[originCity]
  const dest = CITIES_DB[buyerCity]
  if (!origin || !dest) return 20000 * weight
  const distance = getDistance(origin, dest)
  return (5000 + distance * 150) * weight
}
