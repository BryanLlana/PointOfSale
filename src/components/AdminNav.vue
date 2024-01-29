<script setup>
import { RouterLink } from 'vue-router'
import Link from '@/components/Link.vue'
</script>

<template>
  <header class="px-10 py-5 bg-gray-700 flex flex-col md:flex-row gap-8 justify-between absolute top-0 w-full z-10 items-center">
    <div>
      <h1 class="text-3xl font-black text-gray-300">
        <RouterLink :to="{name: 'shop'}">
          POINT
          <span class="text-green-400">OF SALE</span>
        </RouterLink>
      </h1>
    </div>
    <nav class="flex flex-col items-center gap-5 md:flex-row">
      <div class="flex gap-5">
        <RouterLink
          :to="{ name: 'products' }"
          class="rounded text-white font-bold"
        >
          Productos
        </RouterLink>
        <RouterLink
          :to="{ name: 'sales' }"
          class="rounded text-white font-bold"
        >
          Ventas
        </RouterLink>
      </div>
      <Link to="shop">Ir a Tienda</Link>
    </nav>
  </header>
</template>