<script setup>
import { formatCurrency } from '@/helpers';
import Amount from './Amount.vue';
defineProps({
  sale: {
    type: Object
  }
})
</script>

<template>
  <div class="border-t border-gray-200 space-y-6 py-6">
    <h2 class="text-2xl font-black">Detalles Venta:</h2>
    <p class="text-xl font-black text-gray-500">Productos Vendidos</p>

    <ul role="list" class="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500">
      <li v-for="item in sale.items" class="flex space-x-6 py-6 items-center">
        <img class="w-[150px] md:w-[200px] flex-none rounded-full" :src="item.image" :alt="item.name">
        <div class="flex-auto space-y-2">
          <h3 class="text-green-400 font-semibold text-lg">{{ item.name }}</h3>
          <p>{{ formatCurrency(item.price) }}</p>
          <p>Cantidad: {{ item.quantity }}</p>
        </div>
      </li>
    </ul>
    <dl class="space-y-3 border-gray-200 text-sm font-medium text-gray-500">
      <Amount>
        <template #label>Subtotal:</template>
        {{ formatCurrency(sale.subTotal) }}
      </Amount>
      <Amount>
        <template #label>Impuestos:</template>
        {{ formatCurrency(sale.taxes) }}
      </Amount>
      <Amount v-if="sale.discount > 0" class="bg-green-200 p-2">
        <template #label>Descuento:</template>
        {{ formatCurrency(sale.discount) }}
      </Amount>
      <Amount>
        <template #label>Total Pagado:</template>
        {{ formatCurrency(sale.total) }}
      </Amount>
    </dl>
  </div>
</template>