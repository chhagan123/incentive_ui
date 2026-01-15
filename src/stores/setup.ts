import { defineStore } from "pinia";
import { ref } from "vue";
import { getPositions,postPositions,deletePositions } from "../utils/Apis/companySetup";

export const useSetupStore = defineStore("setup", () => {
  const positionsData = ref<any>([])
  const loading = ref<boolean>(false)
  // get positions

  const fetchPositions = async () => {
    const data = await getPositions();
    positionsData.value = data.positions
  };

 
  const addPositions = async (payload: any) => {
    loading.value = true
    try {
      const response = await postPositions(payload)
  
      if (response.status === 201) {
        if (response) {
          positionsData.value = response.data.position
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
  
  return {
    fetchPositions,
    addPositions,
    positionsData,
    loading,
    removePositions
  };
});
