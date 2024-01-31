import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { query, collection, where } from 'firebase/firestore'
import { useFirestore, useCollection } from 'vuefire'

export const useSalesStore = defineStore('sales', () => {
  const date = ref('')
  const firestore = useFirestore()

  const salesSource = computed(() => {
    if (date.value) {
      const q = query(
        collection(firestore, 'sales'),
        where('date', '==', date.value)
      )
      return q
    }
  })

  const sales = useCollection(salesSource)

  const totalSalesDay = computed(() => {
    return sales.value ? sales.value.reduce((total, sale) => total + sale.total, 0) : 0
  })

  return {
    date,
    sales,
    totalSalesDay
  }
})