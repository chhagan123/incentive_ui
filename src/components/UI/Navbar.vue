<template>
  <header class="bg-[var(--color-high-light-black)] w-full">
    <div class="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center gap-6 text-sm text-white">
        <div class="flex items-center gap-3 mr-10">
          <img
            src="@/assets/png/crown.png"
            alt="Incentive Logo"
            class="h-6 w-auto"
          />
        </div>
        <div v-for="link in links" :key="link.name" class="relative ">
          <button
            @click="toggleDropdown(link)"
            class="flex items-center gap-1 px-1 py-2 rounded hover:bg-white hover:text-black"
          >
            {{ link.name }}
            <span v-if="link.children">▾</span>
          </button>

          <!-- Dropdown -->
          <div
            v-if="activeDropdown === link.name && link.children"
            class="absolute left-0 top-full mt-2 w-40 bg-[#1b2430] rounded-md shadow-lg"
          >
            <a
              v-for="child in link.children"
              :key="child.name"
              :href="child.href"
              class="block px-4 py-2 text-white hover:bg-white/10"
            >
              {{ child.name }}
            </a>
          </div>
        </div>
      </nav>

      <!-- Account (Desktop) -->
      <div class=" relative">
        <button
          @click="accountTab = !accountTab"
          class="text-white px-3 py-2 rounded hover:bg-white hover:text-black"
        >
          My Account
        </button>

        <div
          v-if="accountTab"
          class="absolute left-0 max-md:right-0 mt-2 w-30 items-center bg-[#1b2430] rounded-md shadow-lg"
        >
          <a class="block py-2 px-2 text-white ml-3 cursor-pointer hover:bg-white/10"> Sign out </a>
        </div>
      </div>

      <!-- Mobile Menu Button -->
      <button @click="mobileMenu = !mobileMenu" class="md:hidden text-white">
        ☰
      </button>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="mobileMenu"
      class="md:hidden bg-[#1b2430] px-4 py-3 space-y-2 text-white"
    >
      <div v-for="link in links" :key="link.name">
        <div class="font-medium">{{ link.name }}</div>
        <div v-if="link.children" class="ml-4 mt-1 space-y-1 text-sm">
          <a
            v-if="link.children"
            v-for="child in link.children"
            :key="child.name"
            :href="child.href"
            class="block hover:underline"
          >
            {{ child.name }}
          </a>
        </div>
      </div>

      <hr class="border-white/20" />
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";

const mobileMenu = ref(false);
const accountTab = ref(false);
const activeDropdown = ref(null);

const links = [
  {
    name: "Overview",
    href: "/overview",
  },
  {
    name: "Company Setup",
    children: [
      { name: "Branch", href: "/branch" },
      { name: "Position", href: "/position" },
      { name: "Department", href: "/department" },
    ],
  },
  { name: "employees", href: "employee" },
  { name: "calculator instance", href: "cal" },
];

const toggleDropdown = (link) => {
  activeDropdown.value = activeDropdown.value === link.name ? null : link.name;
};
</script>
