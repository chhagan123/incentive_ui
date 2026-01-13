import axios from "./axios"

// postion add/get/and delete
export const getPositions = async () => {
    try {
      const { data } = await axios.get('/api/v2/setup/positions')
      return data
    } catch (error) {
      console.error('Failed to fetch positions:', error)
      throw error
    }
  }