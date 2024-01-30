<script setup>
import { formatCurrency } from '@/helpers';
import { useCartStore } from '@/stores/cart';
import DeleteIcon from '@/components/icons/DeleteIcon.vue';
defineProps({
  item: {
    type: Object
  }
})
const cartStore = useCartStore()
</script>

<template>
  <li class="flex items-center space-x-6 py-5">
    <img :src="item.image" :alt="item.name" class="rounded-full w-[130px] md:w-[200px] flex-none">
    <div class="flex-auto space-y-2">
      <h3 class="text-green-400 font-semibold text-xl">{{ item.name }}</h3>
      <p class="text-blue-400">{{ formatCurrency(item.price) }}</p>
      <select :value="item.quantity" @change="cartStore.updateQuantity(item.id, +$event.target.value)" class="w-full text-center p-2 rounded-lg bg-white">
        <option v-for="n in cartStore.checkProductAvailibility(item)" :value="n">{{ n }}</option>
      </select>
    </div>

    <div>
      <button @click="cartStore.deleteItem(item.id)" type="button" class="text-red-400">
        <DeleteIcon />
      </button>
    </div>
  </li>
</template>