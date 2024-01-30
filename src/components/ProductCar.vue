<script setup>
import AddIcon from '@/components/icons/AddIcon.vue'
import { formatCurrency } from '@/helpers';
import { useCartStore } from '@/stores/cart';
defineProps({
  product: {
    type: Object
  }
})

const cartStore = useCartStore()
</script>

<template>
  <div class="rounded-md bg-white shadow relative">
    <img :src="product.image" :alt="product.name">
    <div class="p-5 space-y-2">
      <h3 class="text-xl font-black text-green-400">{{ product.name }}</h3>
      <p class="text-gray-500">Disponibles: {{ product.availability }}</p>
      <p class="text-2xl font-extrabold text-blue-400">{{ formatCurrency(product.price) }}</p>
    </div>
    <button @click="cartStore.addItem(product)" type="button" class="absolute top-1 -right-3">
      <AddIcon />
    </button>
  </div>
</template>