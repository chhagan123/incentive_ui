import axios from "./axios"

//branches 
// getBranches
export const getBranches = async () => {
  return await axios.get('/api/v2/setup/branches').then((res) => res.data)
}

// createBranches

export const postBranches = async (payload:any) => {
  return await axios.post('/api/v2/setup/branches',payload)
}

//deleteBranch
export const deleteBranches = async(positionId:any) => {
  return await axios.delete(`/api/v2/setup/branches/${positionId}`).then((response) => response.data)
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

  // payout templates

  //getPayout templateData

  export const getPayoutTemp = async () => {
    return await axios.get('/api/v2/setup/templates').then((res) => res.data)
  }

  //addPayout template
  export const postPayoutTemp = async (payload:any) => {
    return await axios.post('/api/v2/setup/templates',payload)
  }

  //deletePayout Temp
  export  const deletePayoutTemp = async(templateId:string) => {
    return await axios.delete(`/api/v2/setup/templates/${templateId}`)
  }