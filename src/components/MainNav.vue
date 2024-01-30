<script setup>
import Link from '@/components/Link.vue'
import { useProductsStore } from '@/stores/products';
const productStore = useProductsStore()
</script>

<template>
  <header class="px-10 py-5 bg-gray-700 flex flex-col md:flex-row gap-8 justify-between absolute top-0 w-full z-10 items-center">
    <div>
      <h1 class="text-3xl font-black text-gray-300">
        POINT
        <span class="text-green-400">OF SALE</span>
      </h1>
      <div class="flex gap-5 text-white mt-3">
        <h2 class="text-lg font-extrabold">Filtros:</h2>
        <div
          class="flex items-center gap-2"
          v-for="category in productStore.categories"
          :key="category.id"
        > 
          <input
            type="radio"
            name="category"
            :value="category.id"
            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            :checked="productStore.selectedCategory === category.id"
            @change="productStore.selectedCategory = +$event.target.value"
          >
          <label class="text-gray-100">{{ category.name }}</label>
        </div>
      </div>
    </div>
    <nav>
      <Link to="admin">Administrar</Link>
    </nav>
  </header>
</template>