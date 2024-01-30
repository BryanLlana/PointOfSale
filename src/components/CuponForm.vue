<script setup>
import { useCouponStore } from '@/stores/coupons'
const couponStore = useCouponStore()
</script>

<template>
  <p class="mt-5 py-5 font-bold border-t border-gray-200">¿Tienes un cupón?</p>
  <div class="flex">
    <input
      v-model="couponStore.couponInput"
      type="text"
      class="p-2 bg-white border-gray-300 w-full"
    >
    <button @click="couponStore.applyCoupon" type="button" class="p-3 bg-green-400 font-bold">Canjear</button>
  </div>
  <p class="py-2 text-center text-sm font-extrabold">{{ couponStore.validationMessage }}</p>
</template>