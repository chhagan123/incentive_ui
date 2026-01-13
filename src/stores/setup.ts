import { defineStore } from "pinia";
import { ref } from "vue";
import { getPositions } from "../utils/Apis/companySetup";

export const useSetupStore = defineStore("setup", () => {
  const postions = ref<any>([]);
  // get positions

  const fetchPositions = async () => {
    const data = await getPositions();
    postions.value = data.positions.map((da: any) => da.name);
  };

  fetchPositions();
  
  return {
    postions,
    fetchPositions,
  };
});
