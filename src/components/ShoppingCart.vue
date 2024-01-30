<script setup>
import { useCartStore } from '@/stores/cart';
import ShoppingCartItem from '@/components/ShoppingCartItem.vue'
import CuponForm from './CuponForm.vue';
import Amount from './Amount.vue';
import { formatCurrency } from '@/helpers';
import { useCouponStore } from '@/stores/coupons';
const cartStore = useCartStore()
const couponStore = useCouponStore()
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
      <Amount v-if="couponStore.discount">
        <template #label>Descuento:</template>
        {{ formatCurrency(couponStore.discount) }}
      </Amount>
      <Amount>
        <template #label>Total a Pagar:</template>
        {{ formatCurrency(cartStore.subTotal + cartStore.taxes - couponStore.discount) }}
      </Amount>
    </dl>

    <CuponForm />
    <button 
      @click="cartStore.checkout"
      type="button"
      class="mt-3 w-full bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold p-3"
    >
      Confirmar Compra
    </button>
  </div>
</template>