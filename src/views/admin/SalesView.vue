<script setup>
import VueTailwindDatePicker from 'vue-tailwind-datepicker'
import { useSalesStore } from '@/stores/sales'
import { ref } from 'vue';
import SaleDetails from '@/components/SaleDetails.vue';
import { formatCurrency } from '@/helpers';
const salesStore = useSalesStore()
const formatter = ref({
  date: 'DD/MM/YYYY',
  month: 'MMMM'
})
</script>

<template>
  <h1 class="text-4xl font-black">Resumen de Ventas</h1>
  <div class="md:flex md:items-start gap-5 mt-5">
    <div class="md:w-1/2 lg:w-1/3 bg-white flex justify-center p-5">
      <VueTailwindDatePicker 
        i18n="es-mx"
        as-single="true"
        no-input
        v-model="salesStore.date"
        :formatter="formatter"
      />
    </div>
    <div class="md:w-1/2 lg:w-2/3 space-y-5 lg:h-screen lg:overflow-y-scroll p-5 pb-5">
      <p class="text-center text-lg" v-if="salesStore.date">
        Ventas de la Fecha: <span class="font-black">{{ salesStore.date }}</span>
      </p>
      <p class="text-center text-lg" v-else>Seleccione una fecha</p>

      <div v-if="salesStore.sales.length > 0" class="space-y-5">
        <SaleDetails 
        v-for="sale in salesStore.sales"
        :key="sale.id"
        :sale="sale"
        />
        <p class="text-right text-2xl">Total del día:
          <span class="font-black">{{ formatCurrency(salesStore.totalSalesDay) }}</span>
        </p>
      </div>
      <p v-else-if="!salesStore.sales.length && salesStore.date" class="text-lg text-center">No hay ventas en este día</p>
    </div>
  </div>
</template>