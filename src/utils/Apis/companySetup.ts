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
// update Branches
export const updateBranches = async (branchId:any,payload:any) => {
  return await axios.put(`/api/v2/setup/branches/${branchId}`,payload)
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

  // Update Positions
  export const updatePositions = async (positionId:any,payload:any) => {
    console.log('Updating position with ID:', positionId, 'and payload:', payload)
    return await axios.put(`/api/v2/setup/positions/${positionId}`,payload)
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

  // single payoutTemplate data by id

  export const getSingleTemp = async (templateId:string) => {
    return await axios.get(`api/v2/setup/templates/${templateId}`)
  }


// post Create payout category for branch

export const postPayoutCategory = async (templateId: string, payload: any) => {
  const res = await axios.post(
    `/api/v2/setup/templates/${templateId}/categories`,
     payload
  );
  return res;
};

// delete payout category for branch

export const deletePayoutCategory = async (templateId: string, payload:any) => {
 const res =  await axios.delete(
    `/api/v2/setup/templates/${templateId}/categories`,
    { data: payload }
  );
  return res;
};
