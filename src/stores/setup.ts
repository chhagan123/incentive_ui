import { defineStore } from "pinia";
import { ref } from "vue";
import { 
  getPositions,
  postPositions,
  deletePositions,
  getBranches,
  postBranches,
  deleteBranches,
  getPayoutTemp,
  postPayoutTemp,
  deletePayoutTemp,
  getSingleTemp,
  postPayoutCategory,
  deletePayoutCategory,
  updateBranches 
} from "../utils/Apis/companySetup";

export const useSetupStore = defineStore("setup", () => {
  const positionsData = ref<any>([])
  const branchesData = ref<any>([])
  const loading = ref<boolean>(false)
  const payoutTempData = ref<any>([])
  const singleTempData = ref<any>([])
  const deleteloading = ref<boolean>(false)


   //helper function formdate
  const formatDate = (dateStr:Date) => {
    if (!dateStr) return '-'
    return new Date(dateStr).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  }

  //getBranches data

  const fetchBranches = async () => {
    const data = await getBranches()
  
    branchesData.value = data.branches.map((branch:any )=> ({
      ...branch,
      created_at: formatDate(branch.created_at),
      // updated_at: formatDate(branch.updated_at)
    }))
  }

  // addBranches

  const addBranches = async (payload: any) => {
    loading.value = true
    const res = await postBranches(payload);

    if (res.status == 201) {
      const newBranch = res?.data?.branch;
      branchesData.value = [...branchesData.value, newBranch];
      loading.value=false
    }
    return res;
  };
   
  //deleteBranch

  const removeBranches = async (positionId: any) => {
    try {
      await deleteBranches(positionId)
      branchesData.value = branchesData.value.filter(
        (pos: any) => pos.id !== positionId
      )
      alert('Successfully deleted')
    } catch (error) {
      console.error('Error deleting position:', error)
      alert('Error deleting position')
    } finally {
     
    }
  }

  //update Branches
  const  updateBranch = async (branchId:any,payload:any) => {
    const res = await updateBranches(branchId,payload)
    if(res.status == 200){
      alert('Branch updated successfully');
      return res
    }else{
      alert('Error updating branch');
    }
  }
  
  // get positions
  const fetchPositions = async () => {
    const data = await getPositions();
  
    positionsData.value = data.positions.map((position:any )=> ({
      ...position,
      created_at: formatDate(position.created_at),
      // updated_at: formatDate(branch.updated_at)
    }))
  };

  const addPositions = async (payload: any) => {
    loading.value = true
    try {
      const response = await postPositions(payload)
  
      if (response.status === 201 && response.data?.position) {
        // Convert created_at to human-readable date (DD MMM YYYY)
        const newPos = {
          ...response.data.position,
          created_at: new Date(response.data.position.created_at).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          }),
        }
  
        // Push to positionsData array
        positionsData.value.push(newPos)
        alert('Position added successfully')
      } else {
        alert('Something went wrong')
      }
    } catch (err) {
      console.error(err)
      alert('Error occurred while adding position')
    } finally {
      loading.value = false
    }
  }  

  const removePositions = async (positionId: any) => {
    loading.value = true
    try {
      await deletePositions(positionId)
      positionsData.value = positionsData.value.filter(
        (pos: any) => pos.id !== positionId
      )
      alert('Successfully deleted')
    } catch (error) {
      console.error('Error deleting position:', error)
      alert('Error deleting position')
    } finally {
      loading.value = false
    }
  }


  //Payout template
  
  // get payoutTemp

  const fetchPayoutTemp = async() => {
    const data = await getPayoutTemp()    

      payoutTempData.value = data.templates.map((temp:any )=> ({
      ...temp,
      created_at: formatDate(temp.created_at),
      // updated_at: formatDate(branch.updated_at)
    }))
    console.log("pay",payoutTempData)
  }

  // add payoutTemp
  const addPayoutTemp = async (payload: any) => {
    loading.value = true;
    try {
      const data = await postPayoutTemp(payload);
      return data;
    } catch (error) {
      throw error;
    } finally {
      loading.value = false;
    }
  };

  const removePayoutTemp = async (templateId: any) => {
    try {
      console.log('id',templateId)
      const res = await deletePayoutTemp(templateId);
  
      if (res.status === 200 || res.status === 204) {
        payoutTempData.value = payoutTempData.value.filter(
          (temp: any) => temp.id !== templateId
        );
      }
  
      return res;
    } catch (error) {
      console.error('Delete failed', error);
    }
  };

  // get single payout Template data

  const fetchSingleTemp = async(templateId:string) => {
    const res = await getSingleTemp(templateId)
    singleTempData.value = res?.data?.template
    console.log('single',singleTempData.value)
    return res
  }

 // post payout category for branch
 const addPayoutCategory = async (payload:any,templateId:string) => {
  try{
    loading.value = true
    const res =  await postPayoutCategory(payload,templateId)
    return res
  }catch(error){  
    throw error
  }finally{
    loading.value = false
  }

 }

 // delete payout category for branch
  const removePayoutCategory = async(templateId:string,payload:any) => {
    console.log('temp',templateId)
    console.log('pay',payload)
    try{
      const res = await deletePayoutCategory(templateId,payload)
      return res
    }catch(error){
      console.error('Delete failed', error);
    }finally{
      loading.value = false
    }
  }

  return {
    fetchPositions,
    addPositions,
    positionsData,
    loading,
    removePositions,
    branchesData,
    fetchBranches,
    addBranches,
    removeBranches,
    fetchPayoutTemp,
    payoutTempData,
    addPayoutTemp,
    removePayoutTemp,
    fetchSingleTemp,
    singleTempData,
    addPayoutCategory,
    removePayoutCategory,
    deleteloading,
    updateBranch
  };
});
