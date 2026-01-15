import axios from "./axios"

//branches 

export const getBranches = async () => {
  return await axios.get('/api/v2/setup/branches').then((res) => res.data)
}

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

  export const postPositions = async (payload:any) => {
    try {
        const response = await axios.post('/api/v2/setup/positions',payload)
        return response
    }catch (error){
          console.error('failed to fetch error',error)
          throw error
    }
  }

  export const deletePositions = async(positionId:any) => {
    return await axios.delete(`/api/v2/setup/positions/${positionId}`).then((response) => response.data)
    
  }