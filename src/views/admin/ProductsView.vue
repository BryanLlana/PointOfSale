<script setup>
import Link from '@/components/Link.vue';
import Product from '@/components/Product.vue';
import { useProductsStore } from '@/stores/products'

const productStore = useProductsStore()
</script>

<template>
  <div>
    <Link to="new-product">Nuevo Producto</Link>
    <h1 class="text-4xl font-black my-10">Productos</h1>
    <ul class="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
      <Product
        v-for="product in productStore.products"
        :product="product"
        :key="product.id"
      />
    </ul>
  </div>
</template>