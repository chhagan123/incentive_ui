<template>
    <div class="overflow-x-auto w-full" role="region" aria-label="Data table">
      <!-- Density Controls -->
      <div v-if="enableDensity" class="flex justify-end items-center gap-2 mb-2">
        <component
          @click="density = 'comfortable'"
          :class="[
            'p-2 rounded h-8 w-8 cursor-pointer flex items-center justify-center',
            density === 'comfortable'
              ? 'bg-[var(--color-primary)] text-white'
              : 'bg-gray-300 text-black',
          ]"
          :is="NormalView"
          type="button"
          aria-pressed="density === 'comfortable'"
        />
  
        <component
          @click="density = 'compact'"
          :class="[
            'p-2 rounded h-8 w-8 cursor-pointer flex items-center justify-center',
            density === 'compact' ? 'bg-[var(--color-primary)] text-white' : 'bg-gray-300 text-black',
          ]"
          :is="CompactView"
          type="button"
          aria-pressed="density === 'compact'"
        />
      </div>
  
      <table class="min-w-full overflow-scroll font-custom table-fixed" role="table">
        <!-- Table Head (Sticky) -->
        <thead class="bg-gray-50 sticky top-0" role="rowgroup">
          <tr role="row">
            <th
              v-if="rowsExpand"
              class="w-10 border-b border-gray-500"
              role="columnheader"
              scope="col"
            ></th>
            <th
              v-for="(column, index) in columns"
              :key="index"
              :style="{ width: columnWidths[index] + 'px', minWidth: '80px' }"
              class="leading-6 text-left px-4 py-3 font-custom font-semibold text-gray-800 border-b border-gray-500 text-xs sm:text-sm md:text-base relative group select-none"
              @click="column.sortable ? sortBy(column.field) : null"
              role="columnheader"
              :aria-sort="
                sortField === column.field
                  ? sortOrder === 'asc'
                    ? 'ascending'
                    : 'descending'
                  : 'none'
              "
              tabindex="0"
              @keyup.enter="column.sortable ? sortBy(column.field) : null"
            >
              <div class="flex items-center gap-1">
                <span class="truncate">{{ column.label }}</span>
                <span v-if="column.sortable" aria-hidden="true">
                  <span v-if="sortField === column.field">
                    <component v-if="sortOrder === 'asc'" class="h-3 w-3" :is="Up" />
                    <component v-if="sortOrder === 'desc'" class="h-3 w-3" :is="Down" />
                  </span>
                  <span v-else><component class="h-3 w-3" :is="DownUp" /></span>
                </span>
              </div>
  
              <!-- Resize Handle -->
              <div
                class="absolute top-0 right-0 h-full w-1 cursor-col-resize bg-transparent group-hover:bg-gray-400/40"
                @mousedown.prevent="startResizing(index, $event)"
                role="separator"
                :aria-orientation="'horizontal'"
                :aria-label="`Resize ${column.label} column`"
              ></div>
            </th>
          </tr>
        </thead>
        <!-- Table Body -->
        <tbody role="rowgroup">
          <!-- Loading Skeletons -->
          <template v-if="loading">
            <tr v-for="n in rowsPerPage" :key="'skeleton-' + n" role="row" aria-busy="true">
              <td v-if="rowsExpand" class="text-center px-2 border-b border-gray-500" role="cell">
                <div class="h-4 w-4 bg-gray-500 animate-pulse rounded"></div>
              </td>
              <td
                v-for="(col, i) in columns"
                :key="i"
                :style="{
                  width: columnWidths[i] + 'px',
                  minWidth: '80px',
                }"
                :class="[
                  'border-b border-gray-500',
                  density === 'comfortable' ? 'px-4 py-3' : 'px-2 py-1',
                ]"
                role="cell"
              >
                <div class="h-4 w-3/4 bg-gray-500 animate-pulse rounded"></div>
              </td>
            </tr>
          </template>
  
          <!-- Error State -->
          <template v-else-if="error">
            <tr role="row">
              <td
                :colspan="columns.length + (rowsExpand ? 1 : 0)"
                class="text-center py-6"
                role="cell"
              >
                <div class="flex flex-col items-center gap-3">
                  <span class="text-(--color-error) font-semibold text-xs sm:text-sm md:text-base">
                    {{ error }}
                  </span>
                  <button
                    @click="onRetry"
                    :disabled="loading || retrying"
                    class="px-4 py-1.5 text-xs sm:text-sm md:text-base rounded-lg bg-red-500 text-gray-700 cursor-pointer hover:bg-red-600 transition disabled:opacity-50"
                    type="button"
                  >
                    <span v-if="!retrying">Retry</span>
                    <span v-else>Retrying…</span>
                  </button>
                </div>
              </td>
            </tr>
          </template>
  
          <!-- Actual Rows -->
          <template v-else>
            <template
              v-for="(row, rowIndex) in paginatedRows"
              :key="rowKeyValue(row, (currentPage - 1) * rowsPerPage + rowIndex)"
            >
              <!-- Main row -->
              <tr
                class="hover:bg-gray-300 transition-colors duration-300 ease-in-out cursor-pointer"
                role="row"
              >
                <!-- Expand icon -->
                <td
                  v-if="rowsExpand"
                  class="text-center px-2 border-b border-gray-500"
                  @click="toggleRow(rowGlobalIndex(rowIndex))"
                  role="cell"
                  aria-expanded="expandedRows.includes(rowGlobalIndex(rowIndex))"
                >
                  <component
                    class="inline-block h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-9 lg:w-9 transform transition-transform duration-300"
                    :class="{ 'rotate-90': expandedRows.includes(rowGlobalIndex(rowIndex)) }"
                    :is="CheveronRight"
                  />
                </td>
  
                <!-- Editable Row Data -->
                <td
                  v-for="(column, colIndex) in columns"
                  :key="colIndex"
                  :style="{ width: columnWidths[colIndex] + 'px' }"
                  :class="[
                    'text-gray-800 border-b border-gray-500 truncate text-xs sm:text-sm md:text-base',
                    density === 'comfortable' ? 'px-4 py-3' : 'px-2 py-1',
                  ]"
                  :title="
                   !props.enableTooltip && typeof row[column.field] === 'string' ? getCellValue(row, column) : undefined
                  "
                  @dblclick="
                    props.enableediting &&
                    !column.slot &&
                    startEditing(rowGlobalIndex(rowIndex), column.field, getCellValue(row, column))
                  "
                  role="cell"
                  @click="onCellClick(row, column, $event)"
                >
                  <!-- Editing mode -->
                  <template v-if="isEditing(rowGlobalIndex(rowIndex), column.field)">
                    <div class="flex items-center gap-1">
                      <input
                        v-model="editValue"
                        :class="[
                          'w-full border rounded text-gray-800 text-xs sm:text-sm md:text-base ring-1 ring-gray-400  focus:ring-2 focus:ring-primary-light focus:ring-inset focus:outline-none',
                          density === 'comfortable' ? 'px-2 py-1' : 'px-1 py-0.5',
                        ]"
                        @keyup.enter="saveEdit(rowGlobalIndex(rowIndex), column.field)"
                        @keyup.esc="cancelEdit()"
                        :ref="setEditRef(rowGlobalIndex(rowIndex), column.field)"
                      />
                      <!-- Check / Cross icons -->
  
                      <Vue3Lottie
                        v-if="props.miniLoading"
                        :animationData="LoadBlack"
                        :height="26"
                        :width="26"
                        class="md:w-[25px] md:h-[25px]"
                      />
  
                      <component
                        v-else
                        @click="saveEdit(rowGlobalIndex(rowIndex), column.field)"
                        class="h-8 w-8 cursor-pointer"
                        :is="Check"
                      />
                      <component @click="cancelEdit()" class="h-8 w-8 cursor-pointer" :is="Cross" />
                    </div>
                  </template>
  
                  <!-- Normal mode (with custom slot support) -->
                  <template v-else>
                    <slot
                      v-if="column.slot"
                      :name="column.slot"
                      :row="row"
                      :value="getCellValue(row, column)"
                      :rowIndex="rowGlobalIndex(rowIndex)"
                    />
                    <template v-else>
                      <template v-if="Array.isArray(getCellValue(row, column))">
                        <div class="flex flex-wrap gap-1">
                          <Batch
                            v-for="(item, i) in getCellValue(row, column)"
                            :key="i"
                            :text="column.subField ? item[column.subField] : item"
                          />
                        </div>
                    </template>
                    <div class="truncate" 
                      :style="{ maxWidth: column.width ? column.width + 'px' : '400px' }"
                      @mouseenter="showTooltip($event, getCellValue(row, column))" 
                      @mouseleave="hideTooltip"
                      >
                      {{ getCellValue(row, column) }}
                    </div>
                  </template>
                </template>
                </td>
              </tr>
              <!-- Expandable details row -->
              <tr v-if="rowsExpand">
                <td
                  colspan="100%"
                  class="px-4 bg-gray-100 border-b border-gray-300"
                  :class="{
                    'py-4 pb-8': expandedRows.includes(rowGlobalIndex(rowIndex)),
                  }"
                >
                  <transition
                    @before-enter="beforeEnter"
                    @enter="enter"
                    @after-enter="afterEnter"
                    @before-leave="beforeLeave"
                    @leave="leave"
                    @after-leave="afterLeave"
                  >
                    <div
                      v-if="expandedRows.includes(rowGlobalIndex(rowIndex))"
                      class="overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                    >
                      <!-- Slot for expandable content -->
                      <slot name="expand" :row="row" :rowIndex="rowGlobalIndex(rowIndex)">
                        <!-- Default fallback -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                          <div
                            v-for="(col, i) in columns.slice(0, 3)"
                            :key="i"
                            class="p-4 bg-white shadow rounded-2xl transition-all duration-500 ease-in-out"
                          >
                            <p class="text-xs text-gray-500">{{ col.label }}</p>
                            <p class="text-base font-semibold">
                              {{ row[col.field] }}
                            </p>
                          </div>
                        </div>
                      </slot>
                    </div>
                  </transition>
                </td>
              </tr>
            </template>
  
            <tr v-if="!sortedRows.length">
              <td
                :colspan="columns.length + (rowsExpand ? 1 : 0)"
                class="text-center py-4 text-gray-600 text-xs sm:text-sm md:text-base"
                role="cell"
              >
                No data available
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <!-- Pagination Controls -->
    <div
        v-if="enablePagination"
        class="flex justify-center items-center gap-4 mt-6 px-2 text-gray-700 font-custom text-xs sm:text-sm md:text-base"
      >
        <button
          @click="prevPage"
          :disabled="prevDisabled"
          class="px-3 py-1 bg-[var(--color-primary)] text-white rounded disabled:opacity-50 cursor-pointer"
          type="button"
        >
          Prev
        </button>
        <span class="text-sm"> Page {{ currentPage }} of {{ totalPages }} </span>
        <button
          @click="nextPage"
          :disabled="nextDisabled"
          class="px-3 py-1 bg-[var(--color-primary)] text-white rounded disabled:opacity-50 cursor-pointer"
          type="button"
        >
          Next
        </button>
      </div>
      <template>
    <div class="relative">
      <table class="w-full  table-fixed"></table>
      <BaseTooltip 
      v-if="enableTooltip"
      :visible="tooltip.show" 
      :text="tooltip.text" 
      :x="tooltip.x" 
      :y="tooltip.y" 
      />
    </div>
    </template>
  </template>
  <script lang="ts" setup>
  /**
   * Performance & final refinements:
   *  - merged emits (update:rows, retry)
   *  - optional rowKey prop for stable keys (falls back to generated index)
   *  - requestAnimationFrame for resize updates (smoother)
   *  - reset column widths if columns prop changes
   *  - disable retry while loading, show retrying state
   *  - use helper functions to compute stable global row index and keys
   *  - minimal accessible attributes
   */
  
  import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
  import CheveronRight from '@/assets/icons/Chevron/right.vue'
  import DownUp from '@/assets/icons/Arrow/downup.vue'
  import Down from '@/assets/icons/Arrow/down.vue'
  import Up from '@/assets/icons/Arrow/up.vue'
  import Check from '@/assets/icons/Check/index.vue'
  import Cross from '@/assets/icons/Cross/index.vue'
  import NormalView from '@/assets/icons/View/normal.vue'
  import CompactView from '@/assets/icons/View/compact.vue'
  import Batch from '../Batch/Batch.vue'
  import LoadBlack from '@/assets/jsons/loadBlack.json'
  import IconLoader from '@/assets/icons/Loader/index.vue'
  import { reactive } from 'vue'
  import BaseTooltip from '@/components/UI/BaseTable/BaseTooltip.vue'
   
  interface Column {
    label: string
    field: string
    sortable?: boolean
    slot?: string
    subField?: string
    width?: number
    valueGetter?: (row: any) => any 
    clickable?: boolean
  }
  
  interface Row<T = unknown> {
    [key: string]: T
  }
  const tooltip = reactive({
    show: false,
    text: '',
    x: 0,
    y: 0,
  })

  function showTooltip(event:any, text:any) {
    tooltip.text = text
    tooltip.x = event.clientX + 12
    tooltip.y = event.clientY + 12
    tooltip.show = true
  }

  function hideTooltip() {
    tooltip.show = false
  }

  const props = defineProps<{
    columns: Column[]
    rows: Row[]
    rowsPerPage?: number
    rowsExpand?: boolean
    loading?: boolean
    error?: string | null
    rowKey?: string | null // 
    enableDensity?: boolean //
    enablePagination?: boolean 
    miniLoading: boolean
    enableEditing?: boolean
    enableTooltip?: boolean
  }>()
  

const getCellValue = (row: any, column: any) => {
  // If there's a valueGetter function, use it
  if (column.valueGetter && typeof column.valueGetter === 'function') {
    return column.valueGetter(row)
  }
  // Otherwise, return the field value directly
  return row[column.field]
}
export type ClickedCellPayload = {
  field: string
  label: string
  value: unknown
  rowData: Row
}
  const emit = defineEmits<{
    (e: 'update:row', row: Row): void
    (e: 'retry'): void
    (e: 'clicked-cell', payload: ClickedCellPayload): void
  }>()
  
  // density
  const density = ref<'comfortable' | 'compact'>('comfortable')
  
  // Editing state
  const editingCell = ref<{ rowIndex: number; field: string } | null>(null)
  const editValue = ref<string | number>('')
  
  // editable refs map (so focusing the correct input doesn't re-render everything)
  const editInputRefs = ref<Record<string, HTMLInputElement | null>>({})
  
  // small flag for retrying UI
  const retrying = ref(false)
  
  /** helper to set per-cell refs for inputs */
  function setEditRef(rowIndex: number, field: string) {
    return (el: HTMLInputElement | null) => {
      if (el) {
        editInputRefs.value[`${rowIndex}__${field}`] = el
      }
    }
  }
  
  const isEditing = (rowIndex: number, field: string) =>
    editingCell.value?.rowIndex === rowIndex && editingCell.value?.field === field
  
  const startEditing = (rowIndex: number, field: string, value: string | number) => {
    const col = props.columns.find((c) => c.field === field)
    if (col?.slot) return
    editingCell.value = { rowIndex, field }
    editValue.value = value
    nextTick(() => {
      const refKey = `${rowIndex}__${field}`
      editInputRefs.value[refKey]?.focus()
    })
  }
  
  // This for closing the isediting state
  watch(
    () => props.miniLoading,
    (newVal) => {
      if (!newVal) {
        console.log('miniLoading is now false, closing input box')
        editingCell.value = null
        editValue.value = ''
      }
    },
  )
  
  const saveEdit = async (rowIndex: number, field: string) => {
    if (editingCell.value) {
      // make a copy to trigger reactivity
      const updatedRows = [...props.rows]
      updatedRows[rowIndex] = { ...(updatedRows[rowIndex] || {}), [field]: editValue.value }
  
      emit('update:row', updatedRows[rowIndex])
      await nextTick()
  
      // console.log('after emit emit miniLoading:', props.miniLoading)
      // if (!props.miniLoading) {
      //   console.log('miniLoading: after closing the input box', props.miniLoading)
      //   editingCell.value = null
      //   editValue.value = ''
      // }
    }
  }
  
  const cancelEdit = () => {
    editingCell.value = null
    editValue.value = ''
  }
  
  // Sorting
  const sortField = ref<string | null>(null)
  const sortOrder = ref<'asc' | 'desc'>('asc')
  
  const sortBy = (field: string) => {
    if (sortField.value === field) {
      if (sortOrder.value === 'asc') sortOrder.value = 'desc'
      else if (sortOrder.value === 'desc') sortField.value = null
    } else {
      sortField.value = field
      sortOrder.value = 'asc'
    }
  }
  
  /**
   * sortedRows is memoized and only recomputed when
   * props.rows, sortField or sortOrder change.
   */
  const sortedRows = computed(() => {
    // cheap path if no sorting
    if (!sortField.value) return props.rows || []
  
    // create new array (shallow copy) to avoid mutating prop data
    const s = [...(props.rows || [])]
    const field = sortField.value
    s.sort((a, b) => {
      const aValue = a?.[field] ?? ''
      const bValue = b?.[field] ?? ''
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder.value === 'asc' ? aValue - bValue : bValue - aValue
      }
      const aStr = String(aValue).toLowerCase()
      const bStr = String(bValue).toLowerCase()
      if (aStr < bStr) return sortOrder.value === 'asc' ? -1 : 1
      if (aStr > bStr) return sortOrder.value === 'asc' ? 1 : -1
      return 0
    })
    return s
  })
  
  // Pagination
  const currentPage = ref(1)
  const rowsPerPage = props.rowsPerPage ?? 5
  
  const totalPages = computed(() =>
    props.enablePagination ? Math.max(1, Math.ceil(sortedRows.value.length / rowsPerPage)) : 1,
  )
  
  const paginatedRows = computed(() => {
    if (!props.enablePagination) {
      // ✅ Show full data when pagination is disabled
      return sortedRows.value
    }
    const start = (currentPage.value - 1) * rowsPerPage
    return sortedRows.value.slice(start, start + rowsPerPage)
  })
  
  const prevPage = () => {
    if (!props.enablePagination) return
    if (currentPage.value > 1) currentPage.value--
  }
  
  const nextPage = () => {
    if (!props.enablePagination) return
    if (currentPage.value < totalPages.value) currentPage.value++
  }
  
  // disable logic for pagination buttons
  const prevDisabled = computed(
    () =>
      !props.enablePagination ||
      currentPage.value === 1 ||
      !!props.loading ||
      !sortedRows.value.length,
  )
  const nextDisabled = computed(
    () =>
      !props.enablePagination ||
      currentPage.value === totalPages.value ||
      !!props.loading ||
      !sortedRows.value.length,
  )
  
  // Column resize state + smoother updates (rAF)
  const columnWidths = ref<number[]>([])
  onMounted(() => {
    columnWidths.value = props.columns.map(() => 150)
  })
  watch(
    () => props.columns,
    (newCols) => {
      // reset widths when columns change to keep alignment predictable
      columnWidths.value = newCols.map(() => 150)
    },
    { deep: true },
  )
  
  let resizingIndex: number | null = null
  let startX = 0
  let startWidth = 0
  let rafId: number | null = null
  
  const startResizing = (index: number, event: MouseEvent) => {
    resizingIndex = index
    startX = event.pageX
    startWidth = columnWidths.value[index] ?? 150
    document.addEventListener('mousemove', resizeColumn)
    document.addEventListener('mouseup', stopResizing)
    // prevent text selection while resizing
    document.body.style.userSelect = 'none'
  }
  
  const resizeColumn = (event: MouseEvent) => {
    if (resizingIndex === null) return
    const diff = event.pageX - startX
    const newWidth = Math.max(80, startWidth + diff)
    // use rAF to batch DOM updates for smoother UI
    if (rafId !== null) cancelAnimationFrame(rafId)
    rafId = requestAnimationFrame(() => {
      columnWidths.value[resizingIndex as number] = newWidth
    })
  }
  
  const stopResizing = () => {
    resizingIndex = null
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
    document.removeEventListener('mousemove', resizeColumn)
    document.removeEventListener('mouseup', stopResizing)
    document.body.style.userSelect = ''
  }
  
  //oncellclick get data
 function onCellClick(row:any, column:any, event) {
  // Only allow for selected columns
  if (!column.clickable) return

  // Prevent expand / row conflicts
  event.stopPropagation()

  emit('clicked-cell', {
    field: column.field,
    label: column.label,
    value: getCellValue(row, column),
    rowData: row,
  })
  }

  // cleanup - be defensive
  onBeforeUnmount(() => {
    stopResizing()
    document.removeEventListener('mousemove', resizeColumn)
    document.removeEventListener('mouseup', stopResizing)
  })
  
  // Expandable rows state
  const rowsExpand = props.rowsExpand ?? false
  const expandedRows = ref<number[]>([])
  const toggleRow = (rowIndex: number) => {
    if (!rowsExpand) return
    if (expandedRows.value.includes(rowIndex)) {
      expandedRows.value = expandedRows.value.filter((i) => i !== rowIndex)
    } else {
      expandedRows.value.push(rowIndex)
    }
  }
  
  // Animations (kept same, small improvements would be optional)
  function beforeEnter(el: Element) {
    const e = el as HTMLElement
    e.style.height = '0px'
    e.style.opacity = '0'
  }
  function enter(el: Element) {
    const e = el as HTMLElement
    e.style.height = e.scrollHeight + 'px'
    e.style.opacity = '1'
  }
  function afterEnter(el: Element) {
    const e = el as HTMLElement
    e.style.height = 'auto'
  }
  function beforeLeave(el: Element) {
    const e = el as HTMLElement
    e.style.height = e.scrollHeight + 'px'
    e.style.opacity = '1'
  }
  function leave(el: Element) {
    const e = el as HTMLElement
    e.style.height = '0px'
    e.style.opacity = '0'
  }
  function afterLeave(el: Element) {
    const e = el as HTMLElement
    e.style.height = '0px'
  }
  
  // Helpers to provide stable keys and global row indices
  const rowKeyProp = props.rowKey ?? null
  function rowKeyValue(row: Row, idx: number) {
    if (rowKeyProp && row && (row as any)[rowKeyProp] !== undefined) {
      return (row as any)[rowKeyProp]
    }
    // fallback to index-based stable key (global)
    return `row-${idx}`
  }
  function rowGlobalIndex(localIndex: number) {
    return (currentPage.value - 1) * rowsPerPage + localIndex
  }
  
  // Retry logic - emits retry and shows brief retrying state to prevent spamming
  const onRetry = async () => {
    if (props.loading || retrying.value) return
    retrying.value = true
    try {
      emit('retry')
    } finally {
      // keep retrying indicator short — parent should set loading state quickly
      setTimeout(() => {
        retrying.value = false
      }, 1000)
    }
  }
  </script>
  