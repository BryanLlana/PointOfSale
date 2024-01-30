import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { collection, addDoc, runTransaction, doc } from 'firebase/firestore'
import { useFirestore } from 'vuefire'
import { useCouponStore } from './coupons'
import { getCurrentDate } from '@/helpers'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const subTotal = ref(0)
  const taxes = ref(0)
  const TAX_RATE = .10
  const couponStore = useCouponStore()
  const firestore = useFirestore()

  watch(items, () => {
    subTotal.value = items.value.reduce((total, item) => total + (item.quantity * item.price), 0)
    taxes.value = Number((subTotal.value * TAX_RATE).toFixed(2))
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

  const checkout = async () => {
    try {
      await addDoc(collection(firestore, 'sales'), {
        items: items.value.map(item => {
          const { availability, category, ...data} = item
          return data
        }),
        subTotal: subTotal.value,
        taxes: taxes.value,
        discount: couponStore.discount,
        total: (subTotal.value + taxes.value - couponStore.discount),
        date: getCurrentDate()
      })

      items.value.forEach(async item => {
        const productRef = doc(firestore, 'products', item.id)
        await runTransaction(firestore, async transaction => {
          const currentProduct = await transaction.get(productRef)
          const availability = currentProduct.data().availability - item.quantity
          transaction.update(productRef, { availability: availability })
        })
      })

      items.value = []
      subTotal.value = 0
      taxes.value = 0
      couponStore.$reset()
    } catch (error) {
      console.log(error)
    }
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
    taxes,
    checkout
  }
}) 