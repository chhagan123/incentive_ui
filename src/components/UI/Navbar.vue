<template>
  <div
    class="flex justify-start items-center bg-[var(--color-high-light-black)] h-15 w-full"
  >
    <div class="flex items-center ml-25">
      <img
        src="@/assets/png/crown.png"
        alt="Incentive Logo"
        class="h-6 w-auto ml-6"
      />
    </div>
    <div>
      <div>
        <nav class="flex items-center space-x-6 text-sm text-white relative ml-15">
    <div
      v-on:click="tabs = !tabs && link.children ? true : false"
      v-for="link in links"
      :key="link.name"
      class="relative group"
    >
     
      <a
        :href="link.href"
        class="px-3 py-2 rounded hover:bg-white hover:text-black flex items-center gap-1"
      >
        {{ link.name }}
        <span v-if="link.children">▾</span>
      </a>

  
      <div
        v-if=" tabs && link.children"
        class="absolute left-0 top-full mt-2 w-40 bg-[#1b2430] rounded-md shadow-lg
               "
      >
        <a
          v-for="child in link.children"
          :key="child.name"
          :href="child.href"
          class="block px-4 py-2 hover:bg-white/10"
        >
          {{ child.name }}
        </a>
      </div>
    </div>
  </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
    import { ref } from "vue";
 
 const tabs = ref<boolean>(false);
const links = [
  { name: "overview", href: "bpl" },
  {
    name: "Company Setup",
    href: "#",
    children: [
      { name: "Branch", href: "/company/branch" },
      { name: "Position", href: "/company/position" },
      { name: "Department", href: "/company/department" },
    ],
  },
  { name: "employees", href: "employee" },
  { name: "calculator instance", href: "cal" },
];
</script>
