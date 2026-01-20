<template>
    <Modal :visible="visible" @close="onCancel">
      <template #default>
        <h2 class="text-lg font-semibold m-4">
          {{ title }}
        </h2>
  
        <p class="text-md font-sm text-black">
          {{ message }}
        </p>
  
        <div class="flex gap-2 mt-4">
          <!-- Cancel -->
          <button
            type="button"
            class="px-4 py-2 border border-gray-200 rounded w-1/2 cursor-pointer"
            @click="onCancel"
          >
            Cancel
          </button>
  
          <!-- Confirm -->
          <div
            @click="onConfirm"
            class="bg-[#CF6768] hover:bg-red-400 w-1/2 h-10 rounded-sm flex items-center justify-center text-white cursor-pointer"
          >
           <!-- <button>{{ confirmText }}</button> -->
            <ActionWithIcon
                :icon="null"
                :text="confirmText"
                :loading="loading"
            />
      
          </div>
        </div>
      </template>
    </Modal>
  </template>
  
  <script setup>
  import ActionWithIcon from '../Buttons/ActionWithIcon.vue'
  import Modal from './Modal.vue'

  defineProps({
    visible: Boolean,
    title: {
      type: String,
      default: ""
    },
    message: {
      type: String,
      default: "Are you sure you want to delete?"
    },
    confirmText: {
      type: String,
      default: "Delete"
    },
    loading:{
        type:Boolean,
        default:true
    }
  })
  
  const emit = defineEmits(["confirm", "cancel"])
  
  const onConfirm = () => emit("confirm")
  const onCancel = () => emit("cancel")
  </script>
  