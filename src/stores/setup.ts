import { defineStore } from "pinia";
import { ref } from "vue";
import { getPositions,postPositions } from "../utils/Apis/companySetup";

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
      // Artificial delay for loader visibility
      await new Promise(resolve => setTimeout(resolve, 300)) // 300ms
  
      const response = await postPositions(payload)
  
      if (response.status === 201) {
        if (response) {
          positionsData.value = response.data.position
        }
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
  
  
  return {
    positions,
    fetchPositions,
    addPositions,
    positionsData,
    loading
  };
});
