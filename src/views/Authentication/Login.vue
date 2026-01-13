<template>
    <div v-if="!token" class="flex flex-col gap-5 justify-center p-5 items-center min-h-screen">
      <div class="w-full h-full relative">
        <img
          src="../../assets//pngs/loginbg.png"
          style="width: 55vw; height: 100vh; object-fit: cover"
          alt="bg image"
        />
        <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <div class="flex flex-row justify-between items-center max-w-(--breakpoint-xl) w-full">
            <div class="w-[507px] h-auto flex-col justify-start items-start gap-5 inline-flex">
              <div class="self-stretch h-full flex-col justify-start items-start gap-[3px] flex">
                <div
                  class="text-black-75 text-opacity-75 whitespace-nowrap max-md:text-xl text-4xl font-medium font-['Inter'] leading-[54px]"
                >
                  Incentive Engine
                </div>
                <div
                  class="self-stretch text-black-dark/50 text-opacity-40 max-md:text-xs text-base font-medium font-['Inter'] leading-normal"
                >
                  Speed up monthly incentive calculations! Simplify critical tasks with Incentive
                  Engine, part of the SalesRaja suite by Mutant (X). Please log in below.
                </div>
              </div>
             <div class="bg-[#CF6768] hover:bg-red-400 w-30 h-10 rounded-sm flex items-center justify-center text-white text-md mt-3 cursor-pointer"
               @click="redirect"
             >
                <ActionWithIcon text="Login" :icon="RightArrow" />
              </div>
           
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onBeforeMount, onMounted } from 'vue'
  import ActionWithIcon from '../../components/UI/Buttons/ActionWithIcon.vue'
  import RightArrow from '../../assets/icons/Arrow/RightArrow.vue'
  const token = ref<string>('')
  const { VITE_BACKEND_URI: url } = import.meta.env
  
  const redirect = () => {
    window.location.href = `${url}/api/v2/auth/login`
  }
  
  onBeforeMount(async () => {
    let val = (await localStorage.getItem('token')) || ''
    token.value = val
    if (val != '') {
      window.location.href = `/company-setup/branches`
    }
  })
  
  onMounted(() => {
    if (token.value != '') {
      window.location.href = `${url}/overview`
    }
  })
  </script>
  