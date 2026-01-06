<template>
    <header class="bg-[var(--color-high-light-black)] w-full">
      <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <!-- Left: Logo + Desktop Nav -->
        <div class="flex items-center gap-8">
          <!-- Logo -->
          <img
            src="../assets/pngs/crown.png"
            alt="Incentive Logo"
            class="h-6 w-auto"
          />
  
          <!-- Desktop Navigation -->
          <nav class="hidden md:flex items-center gap-6 text-md text-white">
            <div v-for="link in links" :key="link.name" class="relative">
              <!-- Normal link -->
              <RouterLink
                v-if="!link.children"
                :to="link.to"
                class="px-2 py-2 rounded hover:bg-white hover:text-black"
                active-class="font-semibold bg-white text-black"
                @click="isactive = false"
              >
                {{ link.name }}
              </RouterLink>
  
              <!-- Dropdown -->
              <button
                v-if="link.children"
                @click="toggleDropdown(link.name)"
                class="flex items-center gap-1 px-2 py-2 rounded hover:bg-white hover:text-black cursor-pointer"
                :class="isactive ? 'bg-white text-black':''"
              >
                {{ link.name }}
                <Down class="w-7 h-7"/>
              </button>
              <div
                v-if="activeDropdown === link.name"
                @click="activeDropdown = null"
                class="absolute left-0 top-full mt-2 w-40 bg-[#1b2430] rounded-md shadow-lg"
              >
                <RouterLink
                  v-for="child in link.children"
                  :key="child.name"
                  :to="child.to"
                  class="block px-4 py-2 text-white hover:bg-white/10"
                  active-class="font-semibold"
                  @click="isactive = true"
                >
                  {{ child.name }}
                </RouterLink>
              </div>
            </div>
          </nav>
        </div>
  
        <!-- Right: Account + Mobile Button -->
        <div class="flex items-center gap-4">
          <!-- Account -->
          <div class="relative hidden md:block">
            <button
              @click="accountTab = !accountTab"
              class="text-white px-3 py-2 rounded hover:bg-white hover:text-black"
            >
              My Account
            </button>
  
            <div
              v-if="accountTab"
              class="absolute right-0 mt-2 w-40 bg-[#1b2430] rounded-md shadow-lg"
            >
              <button
                class="block w-full text-left px-4 py-2 text-white hover:bg-white/10"
              >
                Sign out
              </button>
            </div>
          </div>
  
          <!-- Mobile Menu Button -->
          <button
            @click="mobileMenu = !mobileMenu"
            class="md:hidden text-white text-xl"
          >
            ☰
          </button>
        </div>
      </div>
  
      <!-- Mobile Menu -->
      <div
        v-if="mobileMenu"
        class="md:hidden bg-[#1b2430] px-4 py-4 space-y-3 text-white"
      >
        <div v-for="link in links" :key="link.name">
          <!-- Normal link -->
          <RouterLink
            v-if="!link.children"
            :to="link.to"
            class="block font-medium"
            @click="mobileMenu = false"
          >
            {{ link.name }}
          </RouterLink>
  
          <!-- Dropdown -->
          <div v-else>
            <div class="font-medium">{{ link.name }}</div>
            <div class="ml-4 mt-2 space-y-1 text-sm">
              <RouterLink
                v-for="child in link.children"
                :key="child.name"
                :to="child.to"
                class="block hover:underline"
                @click="mobileMenu = false"
              >
                {{ child.name }}
              </RouterLink>
            </div>
          </div>
        </div>
  
        <hr class="border-white/20" />
  
        <button class="block text-left font-medium">Sign out</button>
      </div>
    </header>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  import Down from "../assets/icons/Chevron/Down.vue";
  
  const mobileMenu = ref(false);
  const accountTab = ref(false);
  const activeDropdown = ref(null);
  const isactive = ref(false)
  
  const links = [
    {
      name: "Overview",
      to: "/overview",
    },
    {
      name: "CompanySetup",
      to: "/company-setup",
      children: [
        { name: "Branch", to: "/company-setup/branches" },
        { name: "Position", to: "/company-setup/positions" },
        { name: "Postion layout", to: "/company-setup/payout-templates" },
      ],
    },
    {
      name: "Employees",
      to: "/employees",
    },
    {
      name: "Calculator",
      to: "/calculator",
    },
  ];
  
  const toggleDropdown = (name: any) => { 
    if (activeDropdown.value === name) {
      activeDropdown.value = null;
    } else {
      activeDropdown.value = name;
    }
  };
  </script>