<script setup>
import { formatCurrency } from '@/helpers'
import { RouterLink } from 'vue-router'
import EditIcon from '@/components/icons/EditIcon.vue'
import DeleteIcon from '@/components/icons/DeleteIcon.vue'
import { useProductsStore } from '@/stores/products';
defineProps({
  product: {
    type: Object
  }
})
const productStore = useProductsStore()
</script>

<template>
  <li :class="{'opacity-30': !product.availability}" class="flex gap-7 items-center bg-white py-3 rounded-lg">
    <img :src="product.image" :alt="product.name" class="w-[120px] md:w-[160px] rounded-full">
    <div class="flex flex-col ">
      <div class="space-y-1">
        <p class="font-semibold text-lg text-green-400">{{ product.name }}</p>
        <p>{{ formatCurrency(product.price) }}</p>
        <p class="opacity-50">{{ product.availability }} productos disponibles</p>
      </div>
      <div class="mt-3 flex gap-5">
        <RouterLink
          :to="{ name: 'edit-product', params: { id: product.id } }"
          class="flex gap-1 text-blue-400"
        >
          <EditIcon />Editar
        </RouterLink>
        <button @click="productStore.deleteProduct(product.id)" type="button" class="flex gap-1 text-red-400">
          <DeleteIcon />Eliminar
        </button>
      </div>
    </div>
  </li>
</template>