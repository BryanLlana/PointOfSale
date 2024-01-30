import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const subTotal = ref(0)
  const taxes = ref(0)
  const TAX_RATE = .10

  watch(items, () => {
    subTotal.value = items.value.reduce((total, item) => total + (item.quantity * item.price), 0)
    taxes.value = subTotal.value * TAX_RATE
  }, {
    deep: true
  })

  const addItem = item => {
    const index = items.value.findIndex(i => i.id === item.id)
    if (index >= 0) {
      if(items.value[index].quantity >= item.availability || items.value[index].quantity >= 5) {
        alert('Has alcanzado un límite')
        return
      } else {
        items.value[index].quantity++
      }
    } else {
      items.value.push({...item, id: item.id, quantity: 1})
    }
  }

  const updateQuantity = (id, quantity) => {
    items.value = items.value.map(item => item.id === id ? {...item, quantity} : item)
  }

  const deleteItem = id => {
    items.value = items.value.filter(item => item.id !== id)
  }

  const checkProductAvailibility = computed(() => {
    return product => product.availability < 5 ? product.availability : 5 
  })
  
  return {
    addItem,
    items,
    checkProductAvailibility,
    updateQuantity,
    deleteItem,
    subTotal,
    taxes
  }
}) 