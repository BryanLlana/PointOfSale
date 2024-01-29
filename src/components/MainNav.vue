<script setup>
import Link from '@/components/Link.vue'
</script>

<template>
  <header class="px-10 py-5 bg-gray-700 flex flex-col md:flex-row gap-8 justify-between absolute top-0 w-full z-10 items-center">
    <div>
      <h1 class="text-3xl font-black text-gray-300">
        POINT
        <span class="text-green-400">OF SALE</span>
      </h1>
    </div>
    <nav>
      <Link to="admin">Administrar</Link>
    </nav>
  </header>
</template>