<script setup>
  import AdminNav from '@/components/AdminNav.vue'
</script>

<template>
  <AdminNav />
  <div class="mt-[220px] md:mt-[120px] container mx-auto lg:min-h-screen px-5">
    <RouterView />
  </div>
</template>