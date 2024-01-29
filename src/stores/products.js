import { defineStore } from "pinia";
import { computed } from 'vue'
import { useFirestore } from 'vuefire'
import { addDoc, collection } from 'firebase/firestore'

export const useProductsStore = defineStore('product', () => {
  const firestore = useFirestore()
  const categoryes = [
    { id: 1, name: 'Sudaderas' },
    { id: 2, name: 'Tenis' },
    { id: 3, name: 'Lentes' }
  ]

  const createProduct = async product => {
    try {
      await addDoc(collection(firestore, 'products'), product)
    } catch (error) {
      console.log(error)
    }
  }

  const categoryOptions = computed(() => {
    return [
      { label: '--Selecccione--', value: '', attrs: { disabled: true} },
      ...categoryes.map(category => {
        return {
          label: category.name,
          value: category.id
        }
      })
    ]
  })

  return {
    createProduct,
    categoryOptions
  }
})