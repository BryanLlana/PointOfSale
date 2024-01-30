<script setup>
import { useCartStore } from '@/stores/cart';
import ShoppingCartItem from '@/components/ShoppingCartItem.vue'
import Amount from './Amount.vue';
import { formatCurrency } from '@/helpers';
const cartStore = useCartStore()
</script>

<template>
  <p v-if="!cartStore.items.length" class="text-xl text-center text-gray-900">El carrito está vacío</p>
  <div v-else>
    <p class="text-4xl font-bold text-gray-900">Resumen de Venta</p>
    <ul role="list" class="mt-6 divide-gray-200 divide-y">
      <ShoppingCartItem
        v-for="item in cartStore.items"
        :key="item.id"
        :item="item"
      />
    </ul>
    <dl class="space-y-3 border-gray-200 text-sm font-medium text-gray-500">
      <Amount>
        <template #label>Subtotal:</template>
        {{ formatCurrency(cartStore.subTotal) }}
      </Amount>
      <Amount>
        <template #label>Impuestos:</template>
        {{ formatCurrency(cartStore.taxes) }}
      </Amount>
      <Amount>
        <template #label>Total a Pagar:</template>
        {{ formatCurrency(cartStore.subTotal + cartStore.taxes) }}
      </Amount>
    </dl>
  </div>
</template>