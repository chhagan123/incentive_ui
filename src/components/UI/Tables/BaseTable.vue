<template>
   <div class="overflow-x-auto overflow-y-auto max-h-65">
        <table class="min-w-full border border-white rounded-2xl">
   <!--Header-->
      <thead>
        <tr class="bg-gray-100">
          <th
            v-for="col in columnDefs"
            :key="col.field"
            class="px-4 py-2 border border-black/10 rounded-xl text-left"
          >
            <!-- Header content -->
            <div class="flex items-center justify-between">
              <span>{{ col.label }}</span>
  
              <!-- Header Icon -->
              <component
                v-if="col.headerIcon"
                :is="col.headerIcon.component"
                v-bind="col.headerIcon.props"
                class="w-6 h-6 cursor-pointer"
                @click="col.headerIcon.onClick?.()"
              />
            </div>
          </th>
        </tr>
      </thead>
  
      <!-- BODY -->
      <tbody>
        <tr
          v-for="(row, rowIndex) in rowData"
          :key="rowIndex"
          class="hover:bg-gray-50 border-black/10 rounded-xl"
        >
          <td
            v-for="col in columnDefs"
            :key="col.field"
            class="px-4 py-2 border-3 border-black/10 rounded-xl"
          >
            <div class="flex items-center gap-2">
              <!-- Normal row value -->
              <span> {{ col.valueGetter ? col.valueGetter(row) : row[col.field] }}</span>
  
              <!-- Row Icon(s) -->
              <template v-if="col.cellIcon">
                <component
                  v-for="(icon, idx) in normalizeIcons(col.cellIcon)"
                  :key="idx"
                  :is="icon.component"
                  v-bind="icon.props"
                  class="w-6 h-6 cursor-pointer"
                  @click="icon.onClick?.(row)"
                />
              </template>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
  </template>
  
  <script setup lang="ts">
  /* TYPES*/
  
  interface IconConfig {
    component: any
    props?: Record<string, any>
    onClick?: (row?: any) => void
  }
  
  interface ColumnDef {
    label: string
    field: string
    headerIcon?: IconConfig
    cellIcon?: IconConfig | IconConfig[]
    valueGetter?:(row?:any) => void
  }
  
  /*PROPS */
  
  const props = defineProps<{
    rowData: any[]
    columnDefs: ColumnDef[]
  }>()
  
  
  // Always return array for row icons
  const normalizeIcons = (icon: IconConfig | IconConfig[]) => {
    return Array.isArray(icon) ? icon : [icon]
  }
  </script>
  