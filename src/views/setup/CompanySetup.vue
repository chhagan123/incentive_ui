<template>

    <div class="flex flex-col gap-2 p-6">
        <BreadCrumb :items="breadcrumbItems" />
        <div>
            <h1 class="text-4xl text-black/75 text-opacity-75 font-medium">Company setup</h1>
        </div>
        <p class="text-base text-gray-400">To start using Incentive Engine, first set up your company. Add a branch, add positions, and create a payout template</p>
        <div class="mt-4 bg-black/5 p-4 rounded-md w-70 items-center flex  justify-center">
            <ActionWithicon :icon="downloadIcon" text="Download company setup" />
        </div>
        
    </div>

</template>
<script setup lang="ts">
    import BreadCrumb from '@/components/UI/BreadCrumb/index.vue';
    import downloadIcon from '../../assets/icons/download/downloadIcon.vue';
    import ActionWithicon from '@/components/UI/ActionWithicon/index.vue';

    const breadcrumbItems = [
  { label: "company setup", to: "/" },
  { label: "branch", to: "/company-setup" },
];

</script>