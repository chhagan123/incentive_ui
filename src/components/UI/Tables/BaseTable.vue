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
            <div
              class="flex items-center gap-2 cursor-pointer"
              @dblclick="col.enableediting && startEdit(rowIndex, col.field, row)"
            >
              <!-- DISPLAY MODE -->
              <template v-if="!isEditing(rowIndex, col.field)">
                <span class="cursor-pointer">
                  {{ col.valueGetter ? col.valueGetter(row) : row[col.field] }}
                </span>

                <!-- Row Icon(s) -->
                <template v-if="col.cellIcon">
                  <component
                    v-for="(icon, idx) in normalizeIcons(col.cellIcon)"
                    :key="idx"
                    :is="icon.component"
                    v-bind="icon.props"
                    class="w-6 h-6 cursor-pointer"
                    @click.stop="icon.onClick?.(row)"
                  />
                </template>
              </template>

              <!-- EDIT MODE -->
              <template v-else>
                <input
                  type="text"
                  v-model="cellstring"
                  class="border border-gray-200 rounded gap-2 px-2 py-1 w-1/2  focus:outline-none focus:ring-0  focus:border-gray-300 cursor-pointer"
                  @keyup.enter="saveEdit(row)"
                />
               <div class="flex gap-3">
                  <!-- Save -->
                  <button
                    @click.stop="saveEdit(row)"
                    class="flex items-center gap-1 px-3 py-1.5 rounded-md bg-green-600 text-white text-xs font-medium hover:bg-green-700
                     active:bg-green-800 transition-colors cursor-pointer"
                  >
                    save
                  </button>

                  <!-- Cancel -->
                  <button
                    @click.stop="stopEdit()"
                    class="flex items-center gap-1 px-3 py-1.5 rounded-md border border-gray-300 text-gray-600 text-xs font-medium
                     hover:bg-gray-100 active:bg-gray-200 transition-colors cursor-pointer"
                  >
                    cancel
                  </button>
                </div>

              </template>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

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
    enableediting?:{
      type: boolean,
      default: false
    }
  }
  const emit = defineEmits<{
  (
    e: 'update-row',
    payload: {
      row: any
      field: string
      value: string
    }
  ): void
  }>()

  /*PROPS */
  const props = defineProps<{
    rowData: any[]
    columnDefs: ColumnDef[]
  }>()

  // Always return array for row icons
  const normalizeIcons = (icon: IconConfig | IconConfig[]) => {
    return Array.isArray(icon) ? icon : [icon]
  }

  const editingCell = ref<{ rowIndex: number; field: string } | null>(null);
  const cellstring = ref<string>("");

const stopEdit = () => {
  editingCell.value = null;
  cellstring.value = "";
};

const startEdit = (rowIndex: number, field: string, row: any) => {
  editingCell.value = { rowIndex, field };
  cellstring.value = row[field];
};

const saveEdit = (row: any) => {
  if (!editingCell.value) return;

  emit("update-row", {
    row,
    field: editingCell.value.field,
    value: cellstring.value,
  });

  editingCell.value = null;
  cellstring.value = "";
};

const isEditing = (rowIndex: number, field: string) => {
  return (
    editingCell.value?.rowIndex === rowIndex &&
    editingCell.value?.field === field
  );
};

</script>
