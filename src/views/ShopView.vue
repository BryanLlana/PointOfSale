<script setup>
import MainNav from '@/components/MainNav.vue'
import { useProductsStore } from '@/stores/products';
import ProductCar from '@/components/ProductCar.vue'
const productStore = useProductsStore()
</script>

<template>
  <MainNav />

  <main class="mt-[110px] md:mt-20 pt-10 lg:flex lg:h-screen lg:overflow-y-hidden">
    <div class="lg:w-2/3 lg:screen lg:overflow-y-scroll pt-10 pb-32 px-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      <ProductCar
        v-for="product in productStore.filteredProducts"
        :key="product.id"
        :product="product"
      />
    </div>
    <aside class="lg:w-1/3 lg:screen lg:overflow-y-scroll pt-10 pb-32 px-10">

    </aside>
  </main>
</template>